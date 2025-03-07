import express from 'express'
import mongoose from 'mongoose'
import env from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'

import loginRoute from './routes/loginRoutes.js'
import communityRoute from './routes/communityRoutes.js'
import postRoute from './routes/postRoutes.js'
import userRoute from './routes/userRoutes.js'
import feedRoute from './routes/feedRoutes.js'

import auth from './middleware/auth.js'
import {Server} from 'socket.io'
import {createServer} from 'http'
import { addPost } from './controllers/postController.js'

import User from './models/User.js'
import Feed from './models/Feed.js'




import fs from 'fs'
import multer from 'multer'
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/feed_images', express.static(path.join(__dirname, 'public/feed_images')));



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



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/"); // Save to "public/uploads/"
    },
    filename: (req, file, cb) => {
        if (!req.user || !req.user.id) {
            return cb(new Error("User ID is missing"), null);
        }
        cb(null, `${req.user.id}${path.extname(file.originalname)}`); // Save as "userId.jpg/png"
    }
});
const feed_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/feed_images/"); 
    },
    filename: (req, file, cb) => {
        if (!req.user || !req.user.id) {
            return cb(new Error("User ID is missing"), null);
        }
        const timestamp = Date.now(); // Declare timestamp inside the function
        cb(null, `${req.user.id}_${timestamp}${path.extname(file.originalname)}`); 
    }
});


const upload = multer({ storage });
const feed = multer({ storage: feed_storage });

app.use('/lr',loginRoute)
app.use('/cm',communityRoute)
app.use('/post',postRoute)
app.use('/u',userRoute)
app.use('/feed',feedRoute)

app.post("/u/uploadProfilePicture", auth, upload.single("profilePic"), async(req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    const imageUrl = `/uploads/${req.user.id}${path.extname(req.file.originalname)}`; // Path to access image
    const updatedUser = await User.findByIdAndUpdate({_id:req.user.id},{imageUrl:imageUrl},{ new: true });
    res.json({ details:updatedUser });
});
app.post("/f/uploadFeedImage", auth, feed.single("feedImage"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        const imageUrl = `/feed_images/${req.file.filename}`; // Corrected to use generated filename

        // Create a new feed post
        const newFeed = new Feed({
            createdBy: req.user.id, // Authenticated user's ID
            feedImageUrl: imageUrl, // Uploaded image URL
            caption: req.body.caption || "", // Optional caption
        });

        await newFeed.save(); // Save to DB

        res.status(200).json({ message: "Feed post created successfully!", feed: newFeed });
    } catch (error) {
        console.error("Error creating feed:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


server.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`)
})