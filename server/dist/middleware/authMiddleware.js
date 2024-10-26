"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Create the isLogin middleware that checks for the token in cookies
const isLogin = (req, res, next) => {
    var _a, _b;
    console.log("cookies", req.cookies, " and headers", req.headers.authorization);
    const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token) || ((_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1]); // Assuming your token is stored in a 'token' cookie
    if (!token) {
        res.status(401).json({
            success: false,
            message: 'Access denied. No token provided in cookies.',
        });
        return;
    }
    try {
        // Verify the token using your JWT secret
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            res.status(401).json({
                success: false,
                message: 'Invalid token.',
            });
            return;
        }
        req.user = decoded;
        next();
    }
    catch (err) {
    }
};
exports.isLogin = isLogin;
