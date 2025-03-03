import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UniVibe_User",
        require:true
    },
    content:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const model = mongoose.model("Post",postSchema)

export default model