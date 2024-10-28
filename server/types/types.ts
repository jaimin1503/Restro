import { Category } from "@prisma/client";
import {Request} from 'express'
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
export interface CustomRequest extends Request {
  user?: userPyload ; 
}