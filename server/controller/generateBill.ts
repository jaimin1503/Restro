import prisma from "../prismaconfig/prisma";
import { Request, Response } from "express";

export const generateBill = async (req: Request, res: Response): Promise<void> => {
    try {
        const { phoneNumber }: { phoneNumber: string } = req.body;
        const user = await prisma.user.findUnique({
            where: { phoneNumber }
        })
        if (!user) {
            res.status(400).json({
                success: false,
                message: "you have not placed any order yet"
            })
            return
        }
        const allOrder = await prisma.order.findMany({
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
        })
        res.status(200).json({
            success:true,
            message:"bill generated success fully",
            allOrder
        })
        return
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "error accure in generate bill",
            error
        })
        return
    }
}