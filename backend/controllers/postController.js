import Post from '../models/Post.js'
import Community from '../models/Community.js'
import User from '../models/User.js'


const addPost = async(message,communityName,userId,io)=>{
    try{
        const user = await User.findOne({enrollment:userId})
        const newPost = new Post({createdBy:user._id,content:message})
        await newPost.save()
        const returnPost = await Post.findById(newPost._id).populate({path:"createdBy",select:"name enrollment"})
        const community = await Community.findOne({name:communityName})
        if (!community){
            return res.status(401).json({error:"Community not found"})
        }
        community.posts.push(newPost)
        await community.save()


        io.to(communityName).emit('newPost', returnPost);
        console.log(`New post added to ${communityName}`)


        // res.status(200).json({message:"New Post added to community"})

    }catch(err){
        // res.status(501).json({error:err.message,message:"Internal Server Error"})
        console.log(err.message)
    }
}

const getAllPost = async(req,res)=>{
    try{
        const {communityName} = req.body 
        const posts = await Community.findOne({name:communityName}).populate({path:"posts" , select:"content createdAt" , populate:{ path:"createdBy" , select:"name enrollment"}})
        if (!posts){
            return res.status(404).json({error:"Community not found"})
        }
        res.status(200).json({message:"Community posts fetched",details:posts})
        
    }catch(err){
        res.status(501).json({error:err.message,message:"Internal Server Error"})
    }
}

export {addPost,getAllPost}