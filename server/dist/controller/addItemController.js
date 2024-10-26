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
exports.addItem = void 0;
const prisma_1 = __importDefault(require("../prismaconfig/prisma"));
const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, itemCode, price, itemImage, quantity, categories } = req.body;
        if (!name || !price || !quantity || !categories || categories.length === 0) {
            res.status(400).json({
                suceess: false,
                message: "please provide all information"
            });
            return;
        }
        const item = yield prisma_1.default.item.findUnique({
            where: { itemCode }
        });
        if (item) {
            res.status(400).json({
                success: false,
                message: "item is already exist please update item",
                item
            });
            return;
        }
        const newItem = yield prisma_1.default.item.create({
            data: Object.assign({ name,
                itemCode,
                price,
                quantity, categories: { set: categories } }, (itemImage ? { itemImage } : {}))
        });
        res.status(200).json({
            success: true,
            message: "item added successfully",
            newItem
        });
        return;
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Error occurred during item creation",
            error
        });
        return;
    }
});
exports.addItem = addItem;
