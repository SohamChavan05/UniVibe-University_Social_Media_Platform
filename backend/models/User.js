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
        type:String,
        required:true
    }
})

const model = mongoose.model("UniVibe_User",userSchema)

export default model