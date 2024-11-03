import prisma from "../prismaconfig/prisma";
import { Request, Response } from "express";
import { CustomRequest } from "../types/types";
import { Role } from "@prisma/client";
import bcrypt from 'bcrypt';

export const addUserByAdmin = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { name, email, role, phoneNumber }: { name: string, email: string, password: string, role: Role, phoneNumber: string } = req.body
        if (!req.user?.userid) {
            res.status(401).json({
                success: false,
                message: "userid messing in req"
            })
            return
        }
        const phoneRegex = /^[6-9]\d{9}$/;
        if(phoneNumber.length!=10 && !phoneRegex.test(phoneNumber)){
            res.status(400).json({
                success:false,
                message:"please provide valide mobile number"
            })
            return
        }   
        const userid = parseInt(req.user?.userid)
        const user = await prisma.staff.findUnique({
            where: { id: userid },
        });

        if (!user) {
            res.status(404).json({
                success: false,
                message: "you are  not authenticate.",
            });
            return
        }
        const hashpassword = await bcrypt.hash(email, 10);
        const addeduser = await prisma.staff.create({
            data: {
                name,
                email,
                password: hashpassword,
                role,
                phoneNumber
            }
        })
        res.status(200).json({
            success: true,
            message: "user added successfuly.",
            addeduser,
        });
        return
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error accure in addCouter",
            error
        })
    } finally {
        await prisma.$disconnect();
    }
}

export const changePassword = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { password, newPassword, confirmNewPassword } = req.body
        if (!password || !newPassword || !confirmNewPassword) {
            res.status(400).json({
                success: false,
                message: "please provide all credintial"
            })
            return
        }
        if (newPassword != confirmNewPassword) {
            res.status(400).json({
                status: false,
                message: "newpassword and confirmPassword is not same"
            })
            return
        }
        if (!req.user?.userid) {
            res.status(401).json({
                success: false,
                message: "userid messing in req"
            })
            return
        }
        const userid = parseInt(req.user?.userid);
        const user = await prisma.staff.findUnique({
            where: { id: userid }
        })
        if (!user) {
            res.status(400).json({
                success: false,
                message: "user does not found"
            })
            return
        }
        if (user?.password) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                res.status(401).json({
                    success: false,
                    message: "Invalid email or password. Please try again.",
                });
                return
            }
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        const updatedPassword = await prisma.staff.update({
            where: { id: user.id },
            data: {
                password: hashedPassword
            }
        })
        res.status(200).json({
            suucess: true,
            message: "password chenge successfully",
            user: updatedPassword
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "error accure in changePassword",
            error
        })
    }finally {
        await prisma.$disconnect();
      }
}