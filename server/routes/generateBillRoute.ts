import express from "express";
import { generateBill } from "../controller/generateBill";
const router=express.Router();
router.post("/generateBill",generateBill)
export default router