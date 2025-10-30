import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from 'dotenv';

dotenv.config(); 

const JWT_SECRET = process.env.JWT_SECRET; // must be same as in userController.js



export default async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    // ✅ Correct way to extract token
    const token = authHeader.split(" ")[1];
   
     console.log("Extracted Token:", token);
    
   
    

    // ✅ Verify token
    const payload = jwt.verify(token, JWT_SECRET);
    console.log("JWT verified:", payload);

    // ✅ Fetch user (optional)
    const user = await User.findById(payload.id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("JWT_VERIFICATION FAILED", err);
    return res.status(401).json({
      success: false,
      message: "Token invalid or expired",
    });
  }
}





    

