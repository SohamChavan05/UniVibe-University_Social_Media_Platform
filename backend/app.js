import express from 'express'
import mongoose from 'mongoose'
import env from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import loginRoute from './routes/loginRoutes.js'
import communityRoute from './routes/communityRoutes.js'
import postRoute from './routes/postRoutes.js'
import userRoute from './routes/userRoutes.js'
import {Server} from 'socket.io'
import {createServer} from 'http'
import { addPost } from './controllers/postController.js'

env.config()

const app = express()
const server = createServer(app)
const io = new Server(server,{
    cors: {
        origin: "*",  // Allow requests from any frontend
        methods: ["GET", "POST"]
    }
})

app.use((req,res,next)=>{
    req.io = io
    next();
})

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id)

    // Join a room for a specific community
    socket.on('joinCommunity', (communityName) => {
        socket.join(communityName)
        console.log(`User ${socket.id} joined community ${communityName}`)
    })

    socket.on('addPost',(message,communityName,userId)=>{
        addPost(message,communityName,userId,io);
    })

    // Handle new post in a community
    socket.on('newPost', ({ communityName, post }) => {
        io.to(communityName).emit('postCreated', post) // Broadcast to community members
    })

    // Handle new comment on a post
    socket.on('newComment', ({ communityName, comment }) => {
        io.to(communityName).emit('commentAdded', comment) // Notify all users in the community
    })

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id)
    })
})


app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.URL)
    .then(()=>{
        console.log("Database connected successfully")
    })
    .catch((err)=>{
        console.log(err.message)
    })

const port = process.env.PORT || 8000

app.use('/lr',loginRoute)
app.use('/cm',communityRoute)
app.use('/post',postRoute)
app.use('/u',userRoute)

server.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`)
})