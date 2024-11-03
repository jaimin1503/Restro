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
exports.getItemFromRedis = exports.getPaginatedItems = exports.addItem = void 0;
const prisma_1 = __importDefault(require("../prismaconfig/prisma"));
const index_1 = require("../index");
const fatchFromDB_1 = require("../helper/fatchFromDB");
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
        if (newItem) {
            const itemsRedis = yield index_1.Redisclient.get("manue:items");
            if (!itemsRedis) {
                const items = yield (0, fatchFromDB_1.fatchFromDB)();
                yield index_1.Redisclient.set('menue:items', JSON.stringify(items), { 'EX': 14400 }); // Expire in 4 hours
                console.log('Items cached in Redis');
                res.status(200).json({
                    success: true,
                    message: "item added successfully",
                    newItem
                });
                return;
            }
            const itemsOb = JSON.parse(itemsRedis);
            itemsOb.push(newItem);
            yield index_1.Redisclient.del('menue:items');
            yield index_1.Redisclient.set('manue:items', JSON.stringify(itemsOb), { EX: 14400 });
            res.status(200).json({
                success: true,
                message: "item added successfully",
                newItem
            });
            return;
        }
        res.status(400).json({
            success: false,
            message: "error aacure while db call"
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
    finally {
        yield prisma_1.default.$disconnect();
    }
});
exports.addItem = addItem;
const getPaginatedItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
        const startIndex = (page - 1) * limit;
        const totalItems = yield prisma_1.default.item.count();
        const items = yield prisma_1.default.item.findMany({
            skip: startIndex,
            take: limit,
        });
        res.status(200).json({
            success: true,
            page,
            limit,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            items,
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occurred while fetching items",
            error
        });
        return;
    }
    finally {
        yield prisma_1.default.$disconnect();
    }
});
exports.getPaginatedItems = getPaginatedItems;
const getItemFromRedis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield index_1.Redisclient.get('manue:items');
        console.log("item from redis", item);
        if (!item) {
            const itemDB = yield (0, fatchFromDB_1.fatchFromDB)();
            const result = yield index_1.Redisclient.set("manue:items", JSON.stringify(itemDB), { EX: 14400 });
            console.log("result after redis sset in getitemfromredis", result);
            res.status(200).json({
                success: true,
                message: "item fatched successfully from db",
                items: itemDB
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "item fatched suucessfully from redis",
            items: JSON.parse(item)
        });
        return;
    }
    catch (error) {
        console.error;
        res.status(400).json({
            success: false,
            message: "error accure while fatching item from redis",
            error
        });
        return;
    }
    finally {
        yield prisma_1.default.$disconnect();
    }
});
exports.getItemFromRedis = getItemFromRedis;
