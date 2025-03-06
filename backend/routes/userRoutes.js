import express from 'express'
import { getUser } from '../controllers/userController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/getUser',auth,getUser)

export default router