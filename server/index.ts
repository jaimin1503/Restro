import express,{Express,Request,Response} from "express"
import { WebSocketServer,WebSocket } from "ws";
import http from "http";
import authRouter from "./routes/authRoute";
import itemRouter from "./routes/itemRoute"
import cookiParser from "cookie-parser"
import jwt from 'jsonwebtoken';
const port=3000;
const app=express();
const server=http.createServer(app);
const wss=new WebSocketServer({server})
app.use(express.json());
app.use(cookiParser());
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/item",itemRouter)
app.get("/",(req:Request,res:Response)=>{
    res.send("hello how are you");
})
interface client {
    ws:WebSocket;
    user: object;
}
export let clients:client[]=[]
wss.on("connection",(ws:WebSocket,req)=>{
    if(!req.url){
        return;
    }
    const url =new URL(req.url);
    const token=url.searchParams.get("token");
    if(!token){
        return
    }
    try {
        const decoded=jwt.verify(token, process.env.JWT_SECRET as string);
    const user = typeof decoded === "object" && decoded !== null
    ? { ...decoded }
    : {};
    clients.push({ws,user})

    ws.on("close", () => {
        clients = clients.filter((client) => client.ws !== ws);
        console.log("Client disconnected");
    });
    } catch (error) {
        console.error("Token verification failed:", error);
        ws.close();
    }
})
server.listen(port,()=>{
    console.log("server is listening on port",port);
})