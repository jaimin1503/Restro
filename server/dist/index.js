"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clients = exports.Redisclient = void 0;
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const http_1 = __importDefault(require("http"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const itemRoute_1 = __importDefault(require("./routes/itemRoute"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const addUseRoute_1 = __importDefault(require("./routes/addUseRoute"));
const generateBillRoute_1 = __importDefault(require("./routes/generateBillRoute"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = require("redis");
const fatchFromDB_1 = require("./helper/fatchFromDB");
const node_cron_1 = __importDefault(require("node-cron"));
exports.Redisclient = (0, redis_1.createClient)();
exports.Redisclient.connect();
exports.Redisclient.on('error', (err) => console.log('Redis Client Error', err));
function cacheItems() {
    return __awaiter(this, void 0, void 0, function* () {
        const items = yield (0, fatchFromDB_1.fatchFromDB)();
        yield exports.Redisclient.set('menue:items', JSON.stringify(items), { 'EX': 14400 }); // Expire in 4 hours
        console.log('Items cached in Redis');
    });
}
cacheItems();
node_cron_1.default.schedule('0 */4 * * *', cacheItems);
const port = 3000;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server });
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/v1/auth", authRoute_1.default);
app.use("/api/v1/item", itemRoute_1.default);
app.use("/api/v1", addUseRoute_1.default);
app.use("/api/v1/order", orderRoute_1.default);
app.use("/api/v1", generateBillRoute_1.default);
app.get("/", (req, res) => {
    res.send("hello how are you");
});
exports.clients = new Map();
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
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in the environment variables");
            ws.close();
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = Object.assign({}, decoded);
        if (!user) {
            console.error("User ID missing in token");
            ws.close();
            return;
        }
        const userId = (user === null || user === void 0 ? void 0 : user.userid) ? String(user === null || user === void 0 ? void 0 : user.userid) : null;
        if (!userId) {
            console.error("User ID missing in token");
            ws.close();
            return;
        }
        exports.clients.set(userId, { ws, user });
        ws.on("message", (message) => {
            console.log("Message from client:", message);
        });
        ws.send("Hello client");
        ws.on("close", () => {
            exports.clients.delete(userId);
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
