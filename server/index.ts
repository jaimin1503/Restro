import express,{Express,Request,Response} from "express"
import router from "./routes/authRoute";
const port=3000;
const app=express();
app.use(express.json());
app.use("/api/v1",router)
app.get("/",(req:Request,res:Response)=>{
res.send("hello how are you");
})
app.listen(port,()=>{
    console.log("server is listening on port",port);
})