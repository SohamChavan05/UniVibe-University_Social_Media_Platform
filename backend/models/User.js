import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    token:{
        type:String
    },
    enrollment:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String
    },
    joinedCommunity:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Community"
        }
    ],
    requests:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"UniVibe_User"
        }
    ],
    contacts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"UniVibe_User"
        }
    ],
    bio:{
        type:String
    },
    imageUrl:{
        type:String
    }
})

const model = mongoose.model("UniVibe_User",userSchema)

export default model