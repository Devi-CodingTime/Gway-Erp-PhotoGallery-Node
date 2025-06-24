import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
      return res.status(400).json({success:false, message: "All fields are required" });
    }
    if(password.length < 6) {
      return res.status(400).json({success:false, message: "Password must be at least 6 characters long" });
    }
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({success:false, message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: newUser,
    });
}
catch (error) {
  console.error("Error in registerController:", error);
  res.status(500).json({ message: "Internal server error" });
}
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({success:false, message: "Email not found" });
    }
    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({success:false, message: "Invalid password" });
    }

    // access token generation
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({
        success: true,
        message: "Login successful",
        user,
        token,
    });
  }
  catch(error){
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}