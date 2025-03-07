import express from 'express'
import auth from '../middleware/auth.js'
import { getAllFeed, getFeed } from '../controllers/feedController.js'

const router = express.Router()

router.get('/getAllFeed',auth,getAllFeed)
router.get('/getFeed',auth,getFeed)

export default router