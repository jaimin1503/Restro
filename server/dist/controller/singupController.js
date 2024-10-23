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
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../prismaconfig/prisma"));
const client_1 = require("@prisma/client");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phoneNumber, role } = req.body;
        if (!name || !phoneNumber) {
            res.status(400).json({
                message: "Name and phone number must be provided.",
            });
            return;
        }
        if (email) {
            const existingUser = yield prisma_1.default.user.findUnique({
                where: { email }
            });
            if (existingUser) {
                res.status(400).json({ error: "A user with this email already exists." });
                return;
            }
        }
        let hashedPassword = null;
        if (password) {
            const saltRounds = 10;
            hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        }
        const newUser = yield prisma_1.default.user.create({
            data: {
                name,
                email: email || null, // Set email to null if it's not provided
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
});
exports.default = signup;
