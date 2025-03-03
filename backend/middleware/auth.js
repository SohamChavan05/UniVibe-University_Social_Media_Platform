import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const auth = async(req,res,next)=>{
    try{
        const token = req.header("Authorization")
        if (!token) return res.status(401).json({error:"No Token Provided"})
            
        const tokenPart = token.split(" ")[1];
        if (!tokenPart) return res.status(401).json({error:"Invalid token format"})
                
        const verified = jwt.verify(tokenPart,process.env.JWT_SECRET_KEY);
        const user = await User.findById(verified.id);
        if (!user || user.token!=tokenPart){
            return res.status(401).json({error:"Invalid or expired token"})
        }
        req.user = verified
        next();
    }catch(err){
        return res.status(500).json({ error: "Authentication error", details: err.message });
    }
}

export default auth