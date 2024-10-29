"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clients = void 0;
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
exports.clients = [];
wss.on("connection", (ws, req) => {
    if (!req.url) {
        return;
    }
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    if (!token) {
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = typeof decoded === "object" && decoded !== null
            ? Object.assign({}, decoded) : {};
        exports.clients.push({ ws, user });
        ws.on("close", () => {
            exports.clients = exports.clients.filter((client) => client.ws !== ws);
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
