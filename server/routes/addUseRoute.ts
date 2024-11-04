import express from "express";
import { isLogin } from "../middleware/authMiddleware";
import { isAccess } from '../middleware/accessMiddleware';
import { addUserByAdmin ,changePassword} from "../controller/addUserController";
const router=express.Router();
router.post("/adduser",isLogin,isAccess,addUserByAdmin);
router.post("/changepassword",isLogin,changePassword);
export default router;