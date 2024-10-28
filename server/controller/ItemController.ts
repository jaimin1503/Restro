
import prisma from "../prismaconfig/prisma";
import { Request, Response } from "express"; // Ensure correct import of Response from express
import { parse } from "path";
import { addItems, userPyload } from "../types/types";


interface CustomRequest extends Request {
    user?: userPyload ; 
  }
export const addItem=async(req:Request,res:Response):Promise<void>=>{
    try {
        const {name,itemCode,price,itemImage,quantity,categories}:addItems=req.body;
        if(!name||!price||!quantity||!categories||categories.length === 0){
            res.status(400).json({
                suceess:false,
                message:"please provide all information"
            })
            return
        }
        const item=await prisma.item.findUnique({
            where:{itemCode}
        })
        if(item){
            res.status(400).json({
                success:false,
                message:"item is already exist please update item",
                item
            })
            return;
        }
        const newItem=await prisma.item.create({
            data:{
                name,
                itemCode,
                price,
                quantity,
                categories:{set:categories},
                ...(itemImage ? { itemImage } : {})
            }
        })
        res.status(200).json({
            success:true,
            message:"item added successfully",
            newItem
        })
        return
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Error occurred during item creation",
            error
        })
        return
    }
}

export const getPaginatedItems = async (req: Request, res: Response): Promise<void> => {
//       try {
//         const page = parseInt(req.query.page as string) || 1; // Default to page 1
//         const limit = parseInt(req.query.limit as string) || 10; // Default to 10 items per page
//         const startIndex = (page - 1) * limit;
//         const totalItems = await prisma.item.count();
//         const items = await prisma.item.findMany({
//           skip: startIndex,
//           take: limit,
//         });
//         res.status(200).json({
//           success: true,
//           page,
//           limit,
//           totalItems,
//           totalPages: Math.ceil(totalItems / limit),
//           items,
//         });
//         return 
//       } catch (error) {
//         res.status(500).json({
//           success: false,
//           message: "Error occurred while fetching items",
//           error
//         });
//         return
//       }
};
