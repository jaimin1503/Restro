import express from "express";
// import { addItem ,getPaginatedItems} from "../controller/ItemController";
import { isLogin } from "../middleware/authMiddleware";
import { isAccess } from '../middleware/accessMiddleware';
import { addUserByAdmin } from "../controller/addUserController";
const router=express.Router();
router.post("/adduser",isLogin,isAccess,addUserByAdmin);
export default router;