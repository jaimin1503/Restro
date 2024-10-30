"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const http_1 = __importDefault(require("http"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const itemRoute_1 = __importDefault(require("./routes/itemRoute"));
const addUseRoute_1 = __importDefault(require("./routes/addUseRoute"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const port = 3000;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server });
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/v1/auth", authRoute_1.default);
app.use("/api/v1/item", itemRoute_1.default);
app.use("/api/v1", addUseRoute_1.default);
app.get("/", (req, res) => {
    res.send("hello how are you");
});
// interface client {
//     ws: WebSocket;
//     user: object;
// }
// export let clients: client[] = []
const clients = new Map();
wss.on("connection", (ws, req) => {
    if (!req.url)
        return;
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
        const decodedWithoutVerify = jsonwebtoken_1.default.decode(token);
        console.log("Decoded without verification:", decodedWithoutVerify);
        // Now verify the token
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in the environment variables");
            ws.close();
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log("Token verified successfully");
        const user = typeof decoded === "object" && decoded !== null ? Object.assign({}, decoded) : {};
        console.log("user is", user);
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
    }
    catch (error) {
        console.error("Token verification failed:", error);
        ws.close();
    }
});
server.listen(port, () => {
    console.log("server is listening on port", port);
});
