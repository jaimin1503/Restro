import express from "express";
import  signup  from '../controller/singupController';
 const router=express.Router();
 router.post("/signup",signup);
 export default router;