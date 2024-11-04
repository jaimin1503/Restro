import { json } from "stream/consumers";
import prisma from "../prismaconfig/prisma";
import { Request, Response } from "express";
import { clients } from "..";
interface Item {
    itemId: number;
    quantity: number;
    price:number
}
interface OrderInput {
    name: string;
    phoneNumber: string;
    items: Item[];
    totalPrice: string;
    tabel: string;
}
export const order = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, phoneNumber, items, totalPrice, tabel } = req.body as OrderInput;

        if(!name||!phoneNumber||!Array.isArray(items)||items.length===0){
            res.status(400).json({
                success:false,
                message:"please provaid all credintail"
            })
            return
        }
        let user = await prisma.user.findUnique({
            where: { phoneNumber }
        })
        if (!user) {
            user = await prisma.user.create({
                data: {
                    name,
                    phoneNumber,
                }
            })
        }
        const order = await prisma.order.create({
            data: {
                user: {
                    connect: {
                        id: user.id,
                    },
                },
                items: {
                    create: items.map((item: { itemId: number; quantity: number,price:number}) => ({
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
                totalPrice:Number(totalPrice),
            },
            include: {
                items: true, // Include items in the response
            },
        });
        console.log("order is ",order);
        clients.forEach((value,key)=>{
            value.ws.send(JSON.stringify(order));
        })
        res.status(200).json({
            success:true,
            message:"order placed sussfully"
        })
        return
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "error accure while placeing new order",
            error
        })
    } finally {
        await prisma.$disconnect();        
    }
}