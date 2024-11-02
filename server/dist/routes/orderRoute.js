"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const placeOrder_1 = require("../controller/placeOrder");
const router = express_1.default.Router();
router.post("/placeorder", placeOrder_1.order);
exports.default = router;
