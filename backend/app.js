import express from 'express'
import mongoose from 'mongoose'
import env from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import loginRoute from './routes/loginRoutes.js'
import communityRoute from './routes/communityRoutes.js'
import postRoute from './routes/postRoutes.js'

env.config()

const app = express()

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

app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`)
})