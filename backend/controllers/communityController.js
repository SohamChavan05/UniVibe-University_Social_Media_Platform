import Community from '../models/Community.js'
import User from '../models/User.js'


const createCommunity = async(req,res)=>{
    try{
        const {name} = req.body 
        const newCommunity = new Community({name,createdBy:req.user.id})
        const user = await User.findOne({_id:req.user.id})
        if (!user){
            return res.status(404).json({message:"User not found"})
        }
        newCommunity.members.push(req.user.id)
        await newCommunity.save()
        user.joinedCommunity.push(newCommunity._id)
        await user.save()

        res.status(201).json({message:"Community Created successfully",communityDetails:newCommunity,userDetails:user})
    }catch(err){
        res.status(501).json({error:err.message,message:"Internal Server Error"})
    }
}

const addMember = async(req,res)=>{
    try{
        const {name,userEnrollment} = req.body 
        const user = await User.findOne({enrollment: userEnrollment})
        const community = await Community.findOne({name})
        if (!community){
            return res.status(404).json({message:"Community not found"})
        }

        if (!user){
            return res.status(404).json({message:"User not found"})
        }
        if (community.members.includes(user._id)){
            return res.status(201).json({message:"User Already Joined"})
        }
        community.members.push(user._id)
        user.joinedCommunity.push(community._id)
        await community.save()
        await user.save()
        res.status(201).json({message:"Community member added successfully",communityDetails:community,userDetails:user})
    }catch(err){
        res.status(501).json({error:err.message,message:"Internal Server Error"})
    }
}

const getAllCommunity = async(req,res)=>{
    try{
        const communities = await User.findOne({_id:req.user.id}).populate("joinedCommunity","name")
        console.log(req.user._id)
        return res.status(200).json({details:communities})
    }catch(err){
        res.status(501).json({error:err.message,message:"Internal Server Error"})
    }
}

export {createCommunity,addMember,getAllCommunity}