import jwt from 'jsonwebtoken';
import  userModel  from '../model/userModel.js';

export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied, no token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded.id).select("-password");
    
    if (!req.user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Error in requireSignIn middleware:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}