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
exports.orderStatus = exports.paymentStatus = exports.order = void 0;
const prisma_1 = __importDefault(require("../prismaconfig/prisma"));
const __1 = require("..");
const order = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phoneNumber, items, totalPrice } = req.body;
        const tabel = req.query.tabel;
        if (!tabel) {
            res.status(400).json({
                success: false,
                message: "please provaid tabel number"
            });
            return;
        }
        if (!name || !phoneNumber || !Array.isArray(items) || items.length === 0) {
            res.status(400).json({
                success: false,
                message: "please provaid all credintail"
            });
            return;
        }
        let user = yield prisma_1.default.user.findUnique({
            where: { phoneNumber }
        });
        if (!user) {
            user = yield prisma_1.default.user.create({
                data: {
                    name,
                    phoneNumber,
                }
            });
        }
        const order = yield prisma_1.default.order.create({
            data: {
                user: {
                    connect: {
                        id: user.id,
                    },
                },
                items: {
                    create: items.map((item) => ({
                        item: {
                            connect: {
                                id: item.itemId,
                            },
                        },
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
                tabel,
                totalPrice: Number(totalPrice),
            },
            include: {
                items: true, // Include items in the response
            },
        });
        console.log("order is ", order);
        __1.clients.forEach((value, key) => {
            value.ws.send(JSON.stringify(order));
        });
        res.status(200).json({
            success: true,
            message: "order placed sussfully"
        });
        return;
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "error accure while placeing new order",
            error
        });
    }
    finally {
        yield prisma_1.default.$disconnect();
    }
});
exports.order = order;
const paymentStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId, status } = req.body;
        const order = yield prisma_1.default.order.findUnique({
            where: { id: orderId }
        });
        if (!order) {
            res.status(400).json({
                success: false,
                message: "order not found"
            });
            return;
        }
        const updatedOrder = yield prisma_1.default.order.update({
            where: { id: orderId },
            data: { payment: status }
        });
        res.status(200).json({
            success: true,
            message: "payment status updated successfully",
            updatedOrder
        });
        return;
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "error accure in paymentStatus",
            error
        });
        return;
    }
});
exports.paymentStatus = paymentStatus;
const orderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId, status } = req.body;
        const order = yield prisma_1.default.order.findUnique({
            where: { id: orderId }
        });
        if (!order) {
            res.status(400).json({
                success: false,
                message: "order not found"
            });
            return;
        }
        const updatedOrder = yield prisma_1.default.order.update({
            where: { id: orderId },
            data: { status }
        });
        res.status(200).json({
            success: true,
            message: "payment status updated successfully",
            updatedOrder
        });
        return;
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "error accure in paymentStatus",
            error
        });
        return;
    }
});
exports.orderStatus = orderStatus;
