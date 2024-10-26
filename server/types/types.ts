import { Category } from "@prisma/client";
export interface userPyload {
    userid:string
    email: string
    name:string
    role:string
  }
 export interface addItems {
    name:string;
    price:number,
    itemImage?:string;
    quantity:string,
    itemCode:string,
    categories:Category[]
}