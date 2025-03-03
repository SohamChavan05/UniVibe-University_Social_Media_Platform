import Post from '../models/Post.js'
import Community from '../models/Community.js'

const addPost = async(req,res)=>{
    try{
        const {content,communityName} = req.body 
        const newPost = new Post({createdBy:req.user.id,content})
        await newPost.save()
        const community = await Community.findOne({name:communityName})
        if (!community){
            return res.status(401).json({error:"Community not found"})
        }
        community.posts.push(newPost)
        await community.save()
        res.status(200).json({message:"New Post added to community"})

    }catch(err){
        res.status(501).json({error:err.message,message:"Internal Server Error"})
    }
}

export {addPost}