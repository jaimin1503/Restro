import express, { Express, Request, Response } from "express"
import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import authRouter from "./routes/authRoute";
import itemRouter from "./routes/itemRoute"
import orderRouter from "./routes/orderRoute"
import adduserRouter from "./routes/addUseRoute"
import generateBillRoute from "./routes/generateBillRoute"
import cookiParser from "cookie-parser"
import jwt from 'jsonwebtoken';
import { userPyload } from "./types/types";
import { createClient } from "redis";
import {fatchFromDB} from "./helper/fatchFromDB"
import cron from "node-cron"
export const Redisclient = createClient();
Redisclient.connect();
Redisclient.on('error', (err) => console.log('Redis Client Error', err));
async function cacheItems() {
    const items = await fatchFromDB();
    await Redisclient.set('menue:items', JSON.stringify(items), {'EX': 14400}); // Expire in 4 hours
    console.log('Items cached in Redis');
  
}
cacheItems();
cron.schedule('0 */4 * * *', cacheItems);

const port = 3000;
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server })
app.use(express.json());
app.use(cookiParser());
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/item", itemRouter)
app.use("/api/v1", adduserRouter)
app.use("/api/v1/order", orderRouter)
app.use("/api/v1",generateBillRoute)
app.get("/", (req: Request, res: Response) => {
    res.send("hello how are you");
})


export const clients = new Map<string, { ws: WebSocket, user: userPyload }>();

wss.on("connection", (ws: WebSocket, req) => {
    if (!req.url) return;

    const url = new URL(req.url, `http://${req.headers.host}`);
    const token = url.searchParams.get("token");

    if (!token) {
        console.error("No token found in URL");
        ws.close();
        return;
    }

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in the environment variables");
            ws.close();
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as userPyload;

        const user = { ...decoded }
        if (!user) {
            console.error("User ID missing in token");
            ws.close();
            return;
        }
        const userId = user?.userid ? String(user?.userid) : null;
        if (!userId) {
            console.error("User ID missing in token");
            ws.close();
            return;
        }

        clients.set(userId, { ws, user });

        ws.on("message", (message) => {
            console.log("Message from client:", message);
        });

        ws.send("Hello client");

        ws.on("close", () => {
            clients.delete(userId);
            console.log("Client disconnected");
        });
    } catch (error) {
        console.error("Token verification failed:", error);
        ws.close();
    }
});

server.listen(port, () => {
    console.log("server is listening on port", port);
})