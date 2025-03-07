import Feed from '../models/Feed.js'

const getAllFeed = async(req,res)=>{
try{
    const allFeed = await Feed.find().populate({path:"createdBy" , select:"enrollment name imageUrl" }) 
    if (!allFeed){
        return res.status(404).json({message:"Feed not found"})
    }
    res.status(200).json({message:"Feed fetched successfully",details:allFeed})
}catch(err){
    res.status(501).json({error:err.message,message:"Internal Server Error"})
}
}

const getFeed = async(req,res)=>{
    try{
        const feed = await Feed.find({ createdBy: req.user.id }).populate({
            path: "createdBy",
            select: "enrollment name imageUrl"
          });
        console.log(feed)
        if (!feed){
            return res.status(404).json({message:"Feed not found"})
        }
        res.status(200).json({message:"Feed fetched successfully",details:feed})
    }catch(err){
        res.status(501).json({error:err.message,message:"Internal Server Error"})
    }
}

export {getAllFeed,getFeed}