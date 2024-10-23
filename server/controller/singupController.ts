import { Request, Response } from 'express';  
import bcrypt from 'bcrypt';                
import prisma from '../prismaconfig/prisma';  
import { Role } from '@prisma/client';
interface SignupRequest {
    name: string;            
    email?: string;       
    password?: string;     
    phoneNumber: string;
    role?:Role;   
}

 const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, phoneNumber,role }: SignupRequest = req.body;
        if (!name || !phoneNumber) {
            res.status(400).json({
                message: "Name and phone number must be provided.",
            });
             return;
        }
        if (email) {
            const existingUser = await prisma.user.findUnique({
                where: { email }
            });
            if (existingUser) {
                 res.status(400).json({ error: "A user with this email already exists." });
                 return;
            }
        }
        let hashedPassword: string | null = null;
        if (password) {
            const saltRounds = 10;
            hashedPassword = await bcrypt.hash(password, saltRounds);
        }
        const newUser = await prisma.user.create({
            data: {
                name,
                email: email || null, // Set email to null if it's not provided
                password: hashedPassword, // Hashed password or null
                role:role||Role.USER,
                phoneNumber,
            },
        });
        res.status(201).json({
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                phoneNumber: newUser.phoneNumber,
                createdAt: newUser.createdAt,
            },
        });
        return;

    } catch (error) {
        console.error("Error during sign-up:", error);
         res.status(500).json({ error: "Internal Server Error" });
         return;
    }
};
export default signup