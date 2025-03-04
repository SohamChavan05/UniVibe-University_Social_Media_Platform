import express from 'express'
import auth from '../middleware/auth.js'
import { addMember, createCommunity, getAllCommunity } from '../controllers/communityController.js'

const router = express.Router()

router.post('/createCommunity',auth,createCommunity)
router.post('/addMember',auth,addMember)
router.get('/getAllCommunity',auth,getAllCommunity)

export default router