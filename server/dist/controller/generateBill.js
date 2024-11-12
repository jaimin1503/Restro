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
exports.generateBill = void 0;
const prisma_1 = __importDefault(require("../prismaconfig/prisma"));
const generateBill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phoneNumber } = req.body;
        const user = yield prisma_1.default.user.findUnique({
            where: { phoneNumber }
        });
        if (!user) {
            res.status(400).json({
                success: false,
                message: "you have not placed any order yet"
            });
            return;
        }
        const allOrder = yield prisma_1.default.order.findMany({
            where: {
                AND: [
                    { userId: user.id },
                    { payment: "PENDING" }
                ]
            },
            include: {
                user: true,
                items: true
            }
        });
        res.status(200).json({
            success: true,
            message: "bill generated success fully",
            allOrder
        });
        return;
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "error accure in generate bill",
            error
        });
        return;
    }
});
exports.generateBill = generateBill;
