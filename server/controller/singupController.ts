import { CookieOptions, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../prismaconfig/prisma';
import { Role } from '@prisma/client';
import jwt from "jsonwebtoken";
interface SignupRequest {
    name: string;
    email?: string;
    password?: string;
    phoneNumber: string;
    role?: Role;
}
export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, phoneNumber, role }: SignupRequest = req.body;
        if (!name || !phoneNumber || !password || !email) {
            res.status(400).json({
                message: "please provide all credentials",
            });
            return;
        }
        if (email) {
            const existingUser = await prisma.staff.findUnique({
                where: { email }
            });
            if (existingUser) {
                res.status(400).json({ error: "A user with this email already exists." });
                return;
            }
        }

        const saltRounds = 10;
        let hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await prisma.staff.create({
            data: {
                name,
                email: email, // Set email to null if it's not provided
                password: hashedPassword, // Hashed password or null
                role: role || Role.USER,
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
    } finally {
        await prisma.$disconnect();
    }
};
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "please provide email and password"
            })
        }
        const user = await prisma.staff.findUnique({
            where: { email }
        })

        if (!user) {
            res.status(404).json({
                success: false,
                message: "user doesn't found please sign-up"
            })
            return;
        }
        if (user.password) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                res.status(401).json({
                    success: false,
                    message: "Invalid email or password. Please try again.",
                });
                return
            }
        }
        const payload = {
            userid: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        };
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in the environment variables");
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
        const options: CookieOptions = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: "none"
        };
        // Set token in a cookie
        res.cookie("token", token, options);

        // Set the token in the "Authorization" header (optional)
        res.set("Authorization", `Bearer ${token}`);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                phoneNumber: user.phoneNumber
            },
        })
        return
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "error accure while login",
            error
        })
        return
    } finally {
        await prisma.$disconnect();
    }
}