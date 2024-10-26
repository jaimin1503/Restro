import express from "express";
import { addItem ,getPaginatedItems} from "../controller/ItemController";
import { isLogin } from "../middleware/authMiddleware";
import { isAccess } from '../middleware/accessMiddleware';
 const router=express.Router();
 router.post("/additem",isLogin,isAccess,addItem);
 router.get("/getPaginatedItems",getPaginatedItems);
 export default router;