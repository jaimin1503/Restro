"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const generateBill_1 = require("../controller/generateBill");
const router = express_1.default.Router();
router.post("/generateBill", generateBill_1.generateBill);
exports.default = router;
