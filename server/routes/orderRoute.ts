import express from "express";
import { order } from "../controller/placeOrder";
 const router=express.Router();
 router.post("/placeorder",order)
 export default router