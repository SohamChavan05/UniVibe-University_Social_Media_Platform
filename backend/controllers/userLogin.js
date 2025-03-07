import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const getAllUser = async(req,res)=>{
    try{
        const users = await User.find({});
        console.log(users)
        res.status(200).json({details:users})
    }catch(err){
        res.status(501).json({error:"Internal Server error" ,message:err.message})
    }
}

const register = async(req,res)=>{
    try{
        const {enrollment,name,password} = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new User({enrollment,name,password:hashedPassword})
        await newUser.save()
        res.status(201).json({message:"User Registered successfully",details:newUser})
    }catch(err){
        res.status(501).json({message:"Internal server error",error:err.message})
    }
}

const login = async(req,res)=>{
    try{
        const {enrollment,password} = req.body 
        const user = await User.findOne({enrollment})
        
        if (!user) return res.status(404).json({message:"User not found"})
            
        const isMatch = await bcrypt.compare(password,user.password)
        
        if (!isMatch) return res.status(401).json({message:"Password incorrect"})
            
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRES_IN || "1h"})
        
        user.token = token
        await user.save()
        res.status(200).json({message:"User login successfully",details:user})

    }catch(err){
        res.status(501).json({message:"Internal server error2",error:err.message})
    }
}

const logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token
        if (!token) return res.status(401).json({ error: "No token provided" });

        const user = await User.findOne({ enrollment: req.params.enrollment });
        if (!user) return res.status(404).json({ message: "User Not Found" });

        user.token = "";
        await user.save();
        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};


export {register,login,getAllUser,logout}