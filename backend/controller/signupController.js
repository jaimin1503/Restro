import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
export const signup=async(req,res)=>{
    try {
        const {name}=req.body;
        const res=await prisma.User.create({
            name
        })
    } catch (error) {
        
    }
}