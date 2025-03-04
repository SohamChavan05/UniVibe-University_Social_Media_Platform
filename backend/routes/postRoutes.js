import express from 'express'
import { addPost,getAllPost } from '../controllers/postController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/addPost',auth,addPost)
router.post('/getAllPost',auth,getAllPost)

export default router