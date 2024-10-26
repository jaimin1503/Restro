import express,{Express,Request,Response} from "express"
import authRouter from "./routes/authRoute";
import itemRouter from "./routes/itemRoute"
import cookiParser from "cookie-parser"
const port=3000;
const app=express();
app.use(express.json());
app.use(cookiParser());
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/item",itemRouter)
app.get("/",(req:Request,res:Response)=>{
res.send("hello how are you");
})
app.listen(port,()=>{
    console.log("server is listening on port",port);
})