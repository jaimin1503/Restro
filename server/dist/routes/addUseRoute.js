"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const accessMiddleware_1 = require("../middleware/accessMiddleware");
const addUserController_1 = require("../controller/addUserController");
const router = express_1.default.Router();
router.post("/adduser", authMiddleware_1.isLogin, accessMiddleware_1.isAccess, addUserController_1.addUserByAdmin);
router.post("/changepassword", authMiddleware_1.isLogin, addUserController_1.changePassword);
exports.default = router;
