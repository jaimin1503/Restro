
// import prisma from "../prismaconfig/prisma";
// import { Request, Response } from "express"; // Ensure correct import of Response from express
// import { parse } from "path";
// import { addItems, userPyload } from "../types/types";


// interface CustomRequest extends Request {
//     user?: userPyload ; 
//   }
// export const addItem=async(req:Request,res:Response):Promise<void>=>{
//     try {
//         const {name,itemCode,price,itemImage,quantity,categories}:addItems=req.body;
//         if(!name||!price||!quantity||!categories||categories.length === 0){
//             res.status(400).json({
//                 suceess:false,
//                 message:"please provide all information"
//             })
//             return
//         }
//         const item=await prisma.item.findUnique({
//             where:{itemCode}
//         })
//         if(item){
//             res.status(400).json({
//                 success:false,
//                 message:"item is already exist please update item",
//                 item
//             })
//             return;
//         }
//         const newItem=await prisma.item.create({
//             data:{
//                 name,
//                 itemCode,
//                 price,
//                 quantity,
//                 categories:{set:categories},
//                 ...(itemImage ? { itemImage } : {})
//             }
//         })
//         res.status(200).json({
//             success:true,
//             message:"item added successfully",
//             newItem
//         })
//         return
//     } catch (error) {
//         res.status(400).json({
//             success:false,
//             message:"Error occurred during item creation",
//             error
//         })
//         return
//     }
// }

// export const getPaginatedItems = async (req: Request, res: Response): Promise<void> => {
//       try {
//         const page = parseInt(req.query.page as string) || 1; // Default to page 1
//         const limit = parseInt(req.query.limit as string) || 10; // Default to 10 items per page
//         const startIndex = (page - 1) * limit;
//         const totalItems = await prisma.item.count();
//         const items = await prisma.item.findMany({
//           skip: startIndex,
//           take: limit,
//         });
//         res.status(200).json({
//           success: true,
//           page,
//           limit,
//           totalItems,
//           totalPages: Math.ceil(totalItems / limit),
//           items,
//         });
//         return 
//       } catch (error) {
//         res.status(500).json({
//           success: false,
//           message: "Error occurred while fetching items",
//           error
//         });
//         return
//       }
// };
import express from 'express';
import { WebSocketServer } from 'ws';
import { PrismaClient, Role } from '@prisma/client';
import http from 'http';

const app = express();
const prisma = new PrismaClient();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Middleware for parsing JSON
app.use(express.json());

interface Client {
  ws: WebSocket;
  role: Role;
}

const clients: Client[] = [];

// Add WebSocket connection logic
wss.on('connection', (ws) => {
  ws.on('message', async (data) => {
    const message = JSON.parse(data.toString());

    if (message.type === 'order') {
      // Save the order to the database
      const { userId, items, totalPrice } = message.order;
      const order = await prisma.order.create({
        data: {
          userId,
          items: {
            create: items.map((item: { itemId: number; quantity: number; price: number }) => ({
              itemId: item.itemId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
          totalPrice,
          status: 'PENDING',
        },
      });

      // Broadcast the new order to chefs and receptionists
      clients.forEach((client) => {
        if (client.role === Role.CHEF || client.role === Role.COUNTER) {
          client.ws.send(JSON.stringify({ type: 'new_order', order }));
        }
      });
    }
  });

  ws.on('close', () => {
    // Remove the disconnected client
    const index = clients.findIndex((client) => client.ws === ws);
    if (index !== -1) clients.splice(index, 1);
  });
});

// Endpoint to simulate user placing an order
app.post('/order', async (req, res) => {
  const { userId, items, totalPrice } = req.body;
  const order = await prisma.order.create({
    data: {
      userId,
      items: {
        create: items.map((item: { itemId: number; quantity: number; price: number }) => ({
          itemId: item.itemId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
      totalPrice,
      status: 'PENDING',
    },
  });

  // Notify WebSocket clients
  clients.forEach((client) => {
    if (client.role === Role.CHEF || client.role === Role.COUNTER) {
      client.ws.send(JSON.stringify({ type: 'new_order', order }));
    }
  });

  res.status(201).json({ message: 'Order placed', order });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
