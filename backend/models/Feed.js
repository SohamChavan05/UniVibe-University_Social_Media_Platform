import mongoose from "mongoose";

const feedSchema = new mongoose.Schema({
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"UniVibe_User",
        required:true
    },
    feedImageUrl:{
        type:String,
        required:true
    },
    caption:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const model = mongoose.model("Feed",feedSchema)

export default model