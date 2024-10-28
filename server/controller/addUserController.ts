import prisma from "../prismaconfig/prisma";
import { Request, Response } from "express";
import { CustomRequest } from "../types/types";
import { Role } from "@prisma/client";

export const addUserByAdmin=async(req:CustomRequest,res:Response):Promise<void>=>{
    try {
        const {name,email,password,role,phoneNumber}:{name:string,email:string,password:string,role:Role,phoneNumber:string}=req.body
        const userid=req.user?.userid
        if (typeof userid !== "number" && typeof userid !== "undefined") {
            const parsedId = parseInt(userid as string, 10); // Assuming userid is a string
            if (isNaN(parsedId)) {
                 res.status(400).json({
                    success: false,
                    message: "Invalid user ID provided.",
                });
                return
            }
            // Now parsedId is guaranteed to be a number or undefined
            const user = await prisma.user.findUnique({
                where: { id: parsedId }, 
            });

            if (!user) {
                 res.status(404).json({
                    success: false,
                    message: "you are  not authenticate.",
                });
                return
            }
            const addeduser=await prisma.user.create({
                data:{
                    name,
                    email,
                    password:email,
                    role,
                    phoneNumber
                }
            })
            res.status(200).json({
                success: true,
                message: "user added successfuly.",
                addeduser,
            });
        } else {
             res.status(401).json({
                success: false,
                message: "You do not have access to add user.",
            });
            return
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"error accure in addCouter",
            error
        })
    }
}