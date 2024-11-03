"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ItemController_1 = require("../controller/ItemController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const accessMiddleware_1 = require("../middleware/accessMiddleware");
const router = express_1.default.Router();
router.post("/additem", authMiddleware_1.isLogin, accessMiddleware_1.isAccess, ItemController_1.addItem);
router.get("/getPaginatedItems", ItemController_1.getPaginatedItems);
router.get("/getItemFromRedis", ItemController_1.getItemFromRedis);
exports.default = router;
