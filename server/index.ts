import express,{Express,Request,Response} from "express"
const port=3000;
const app=express();
app.get("/",(req:Request,res:Response)=>{
res.send("hello how are you");
})
app.listen(port,()=>{
    console.log("server is listening on port",port);
})