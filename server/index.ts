import express, { Express, Request, Response } from "express"
import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import authRouter from "./routes/authRoute";
import itemRouter from "./routes/itemRoute"
import adduserRouter from "./routes/addUseRoute"
import cookiParser from "cookie-parser"
import jwt from 'jsonwebtoken';
import { userPyload } from "./types/types";
const port = 3000;
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server })
app.use(express.json());
app.use(cookiParser());
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/item", itemRouter)
app.use("/api/v1", adduserRouter)
app.get("/", (req: Request, res: Response) => {
    res.send("hello how are you");
})
// interface client {
//     ws: WebSocket;
//     user: object;
// }
// export let clients: client[] = []
const clients = new Map<string, { ws: WebSocket, user: userPyload }>();

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
        console.log("Token received:", token);

        // Optionally decode without verification to inspect contents
        const decodedWithoutVerify = jwt.decode(token);
        console.log("Decoded without verification:", decodedWithoutVerify);

        // Now verify the token
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in the environment variables");
            ws.close();
          }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)as userPyload;
        console.log("Token verified successfully");

        const user:userPyload = typeof decoded === "object" && decoded !== null ? { ...decoded } : {};
        console.log("user is",user);
        const userId = user.userid ? String(user.userid) : null;
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