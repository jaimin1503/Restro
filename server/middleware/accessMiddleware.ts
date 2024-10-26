import { Request, Response, NextFunction } from 'express';

interface userPyload {
  userid:string
  email: string
  name:string
  role:string
}
interface CustomRequest extends Request {
  user?: userPyload ; 
}

// Create the isLogin middleware that checks for the token in cookies
export const isAccess = (req: CustomRequest, res: Response, next: NextFunction): void => {
  
  const user= req.user

  if (!user) {
    res.status(401).json({
      success: false,
      message: 'user not found in request',
    });
    return
  }

  try {
    // Verify the token using your JWT secret
    if(user.role){
      if(user.role!="ADMIN"&&user.role!="COUNTER"){
        res.status(403 ).json({
          success:false,
          message:"you are not authorize for add itemYou are not authorized to perform this action"
        })
        return 
      }
    }
    next();
  } catch (error) {
    res.status(500).json({
      sucess:false,
      message:"An error accure in access middleware",
      error
    })
    return
  }
};

