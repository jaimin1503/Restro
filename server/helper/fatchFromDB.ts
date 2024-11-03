import prisma from "../prismaconfig/prisma";


export const fatchFromDB=async ()=>{
    try {
        const items=await prisma.item.findMany()
        if(items){
            return items;
        }
        throw "there is no available any item please add item"
    } catch (error) {
        throw error
    }
}