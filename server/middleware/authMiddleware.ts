import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define an interface for the request object that will hold user information
interface CustomRequest extends Request {
  user?: string | object; // Add a user property to hold decoded token info
}
// Create the isLogin middleware that checks for the token in cookies
export const isLogin = (req: CustomRequest, res: Response, next: NextFunction): void => {
  console.log("cookies",req.cookies," and headers",req.headers.authorization)
  const token = req.cookies?.token||req.headers.authorization?.split(' ')[1]; // Assuming your token is stored in a 'token' cookie

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Access denied. No token provided in cookies.',
    });
    return
  }

  try {
    // Verify the token using your JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if(!decoded){
        res.status(401).json({
            success: false,
            message: 'Invalid token.',
          });
          return 
        
    }
    req.user = decoded;
    next();
  } catch (err) {
    
  }
};

