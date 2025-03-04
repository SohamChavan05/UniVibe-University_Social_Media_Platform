import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UniVibe_User",
        require:true
    },
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"UniVibe_User"
        }
    ],
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ],
    createdAt:{
        type:Date,
        default: Date.now
    }
})


const model = mongoose.model("Community",communitySchema)

export default model
