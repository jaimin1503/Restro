import express from "express";
import { order, orderStatus, paymentStatus } from "../controller/placeOrder";
import { isLogin } from "../middleware/authMiddleware";
import { isAccess } from "../middleware/accessMiddleware";
 const router=express.Router();
 router.post("/placeorder",order);
 router.post("/paymentStatus",isLogin,isAccess,paymentStatus);
 router.post("/orderStatus",isLogin,isAccess,orderStatus);
 export default router