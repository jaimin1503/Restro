"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const placeOrder_1 = require("../controller/placeOrder");
const authMiddleware_1 = require("../middleware/authMiddleware");
const accessMiddleware_1 = require("../middleware/accessMiddleware");
const router = express_1.default.Router();
router.post("/placeorder", placeOrder_1.order);
router.post("/paymentStatus", authMiddleware_1.isLogin, accessMiddleware_1.isAccess, placeOrder_1.paymentStatus);
router.post("/orderStatus", authMiddleware_1.isLogin, accessMiddleware_1.isAccess, placeOrder_1.orderStatus);
exports.default = router;
