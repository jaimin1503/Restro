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
exports.changePassword = exports.addUserByAdmin = void 0;
const prisma_1 = __importDefault(require("../prismaconfig/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const addUserByAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { name, email, role, phoneNumber } = req.body;
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.userid)) {
            res.status(401).json({
                success: false,
                message: "userid messing in req"
            });
            return;
        }
        const phoneRegex = /^[6-9]\d{9}$/;
        if (phoneNumber.length != 10 && !phoneRegex.test(phoneNumber)) {
            res.status(400).json({
                success: false,
                message: "please provide valide mobile number"
            });
            return;
        }
        const userid = parseInt((_b = req.user) === null || _b === void 0 ? void 0 : _b.userid);
        const user = yield prisma_1.default.staff.findUnique({
            where: { id: userid },
        });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "you are  not authenticate.",
            });
            return;
        }
        const hashpassword = yield bcrypt_1.default.hash(email, 10);
        const addeduser = yield prisma_1.default.staff.create({
            data: {
                name,
                email,
                password: hashpassword,
                role,
                phoneNumber
            }
        });
        res.status(200).json({
            success: true,
            message: "user added successfuly.",
            addeduser,
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "error accure in addCouter",
            error
        });
    }
    finally {
        yield prisma_1.default.$disconnect();
    }
});
exports.addUserByAdmin = addUserByAdmin;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { password, newPassword, confirmNewPassword } = req.body;
        if (!password || !newPassword || !confirmNewPassword) {
            res.status(400).json({
                success: false,
                message: "please provide all credintial"
            });
            return;
        }
        if (newPassword != confirmNewPassword) {
            res.status(400).json({
                status: false,
                message: "newpassword and confirmPassword is not same"
            });
            return;
        }
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.userid)) {
            res.status(401).json({
                success: false,
                message: "userid messing in req"
            });
            return;
        }
        const userid = parseInt((_b = req.user) === null || _b === void 0 ? void 0 : _b.userid);
        const user = yield prisma_1.default.staff.findUnique({
            where: { id: userid }
        });
        if (!user) {
            res.status(400).json({
                success: false,
                message: "user does not found"
            });
            return;
        }
        if (user === null || user === void 0 ? void 0 : user.password) {
            const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordMatch) {
                res.status(401).json({
                    success: false,
                    message: "Invalid email or password. Please try again.",
                });
                return;
            }
        }
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, saltRounds);
        const updatedPassword = yield prisma_1.default.staff.update({
            where: { id: user.id },
            data: {
                password: hashedPassword
            }
        });
        res.status(200).json({
            suucess: true,
            message: "password chenge successfully",
            user: updatedPassword
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "error accure in changePassword",
            error
        });
    }
    finally {
        yield prisma_1.default.$disconnect();
    }
});
exports.changePassword = changePassword;
