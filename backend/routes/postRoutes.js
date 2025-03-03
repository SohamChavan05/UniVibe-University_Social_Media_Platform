import express from 'express'
import { addPost } from '../controllers/postController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/addPost',auth,addPost)

export default router