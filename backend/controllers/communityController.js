import Community from '../models/Community.js'


const createCommunity = async(req,res)=>{
    try{
        const {name} = req.body 
        const newCommunity = new Community({name,createdBy:req.user.id})
        await newCommunity.save()
        res.status(201).json({message:"Community Created successfully",details:newCommunity})
    }catch(err){
        res.status(501).json({error:err.message,message:"Internal Server Error"})
    }
}

const addMember = async(req,res)=>{
    try{
        const {name,member} = req.body 
        const community = await Community.findOne({name})
        if (!community){
            return res.status(404).json({message:"Community not found"})
        }

        if (community.members.includes(member)){
            return res.status(201).json({message:"Community Already Joined"})
        }
        community.members.push(member)
        await community.save()
        res.status(201).json({message:"Community member added successfully",details:community})
    }catch(err){
        res.status(501).json({error:err.message,message:"Internal Server Error"})
    }
}

const getAllCommunity = async(req,res)=>{
    try{
        const community = await Community.find({createdBy:req.user.id}).populate("members","name").populate({path:"posts",populate:{path:"createdBy" ,select:"name"}})
        return res.status(200).json({details:community})
    }catch(err){
        res.status(501).json({error:err.message,message:"Internal Server Error"})
    }
}

export {createCommunity,addMember,getAllCommunity}