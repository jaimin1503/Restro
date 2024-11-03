"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../prismaconfig/prisma"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phoneNumber, role } = req.body;
        if (!name || !phoneNumber || !password || !email) {
            res.status(400).json({
                message: "please provide all credentials",
            });
            return;
        }
        if (email) {
            const existingUser = yield prisma_1.default.staff.findUnique({
                where: { email }
            });
            if (existingUser) {
                res.status(400).json({ error: "A user with this email already exists." });
                return;
            }
        }
        const saltRounds = 10;
        let hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const newUser = yield prisma_1.default.staff.create({
            data: {
                name,
                email: email, // Set email to null if it's not provided
                password: hashedPassword, // Hashed password or null
                role: role || client_1.Role.USER,
                phoneNumber,
            },
        });
        res.status(201).json({
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                phoneNumber: newUser.phoneNumber,
                createdAt: newUser.createdAt,
            },
        });
        return;
    }
    catch (error) {
        console.error("Error during sign-up:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
    finally {
        yield prisma_1.default.$disconnect();
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "please provide email and password"
            });
        }
        const user = yield prisma_1.default.staff.findUnique({
            where: { email }
        });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "user doesn't found please sign-up"
            });
            return;
        }
        if (user.password) {
            const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordMatch) {
                res.status(401).json({
                    success: false,
                    message: "Invalid email or password. Please try again.",
                });
                return;
            }
        }
        const payload = {
            userid: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        };
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in the environment variables");
        }
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: "none"
        };
        // Set token in a cookie
        res.cookie("token", token, options);
        // Set the token in the "Authorization" header (optional)
        res.set("Authorization", `Bearer ${token}`);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                phoneNumber: user.phoneNumber
            },
        });
        return;
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "error accure while login",
            error
        });
        return;
    }
    finally {
        yield prisma_1.default.$disconnect();
    }
});
exports.login = login;
