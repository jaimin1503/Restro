
import prisma from "../prismaconfig/prisma";
import { Request, Response } from "express"; // Ensure correct import of Response from express
import { parse } from "path";
import { addItems, userPyload } from "../types/types";
import { promises } from "dns";
import { Redisclient } from "../index";
import { fatchFromDB } from "../helper/fatchFromDB";



interface CustomRequest extends Request {
    user?: userPyload;
}
export const addItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, itemCode, price, itemImage, quantity, categories }: addItems = req.body;
        if (!name || !price || !quantity || !categories || categories.length === 0) {
            res.status(400).json({
                suceess: false,
                message: "please provide all information"
            })
            return
        }
        const item = await prisma.item.findUnique({
            where: { itemCode }
        })
        if (item) {
            res.status(400).json({
                success: false,
                message: "item is already exist please update item",
                item
            })
            return;
        }
        const newItem = await prisma.item.create({
            data: {
                name,
                itemCode,
                price,
                quantity,
                categories: { set: categories },
                ...(itemImage ? { itemImage } : {})
            }
        })
        if(newItem){
            const itemsRedis=await Redisclient.get("manue:items");
            if(!itemsRedis){
                const items = await fatchFromDB();
                await Redisclient.set('menue:items', JSON.stringify(items), {'EX': 14400}); // Expire in 4 hours
                console.log('Items cached in Redis');
                res.status(200).json({
                    success: true,
                    message: "item added successfully",
                    newItem
                })
                return
            }
            const itemsOb=JSON.parse(itemsRedis);
            itemsOb.push(newItem);
            await Redisclient.del('menue:items');
            await Redisclient.set('manue:items',JSON.stringify(itemsOb),{EX:14400})
            res.status(200).json({
                success: true,
                message: "item added successfully",
                newItem
            })
            return
        }
        res.status(400).json({
            success:false,
            message:"error aacure while db call"
        })
        return
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error occurred during item creation",
            error
        })
        return
    } finally {
        await prisma.$disconnect();
    }
}

export const getPaginatedItems = async (req: Request, res: Response): Promise<void> => {
          try {
            const page = parseInt(req.query.page as string) || 1; // Default to page 1
            const limit = parseInt(req.query.limit as string) || 10; // Default to 10 items per page
            const startIndex = (page - 1) * limit;
            const totalItems = await prisma.item.count();
            const items = await prisma.item.findMany({
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
            return 
          } catch (error) {
            res.status(500).json({
              success: false,
              message: "Error occurred while fetching items",
              error
            });
            return
          }finally {
            await prisma.$disconnect();
          }
};
export const getItemFromRedis=async(req:Request,res:Response):Promise<void>=>{
    try {
        const  item=await Redisclient.get('manue:items');
        console.log("item from redis",item)
        if(!item){
            const itemDB=await fatchFromDB()
           const result= await Redisclient.set("manue:items",JSON.stringify(itemDB),{EX:14400});
           console.log("result after redis sset in getitemfromredis",result)
            res.status(200).json({
                success:true,
                message:"item fatched successfully from db",
                items:itemDB
            })
            return
        }
        res.status(200).json({
            success:true,
            message:"item fatched suucessfully from redis",
            items:JSON.parse(item)
        })
        return
    } catch (error) {
        console.error
        res.status(400).json({
            success:false,
            message:"error accure while fatching item from redis",
            error
        })
        return
    }finally {
        await prisma.$disconnect();
    }
}