import express from 'express'
import mongoose from 'mongoose'
import env from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'

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

app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`)
})