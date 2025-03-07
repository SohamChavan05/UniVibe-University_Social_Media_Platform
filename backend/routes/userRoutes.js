import express from 'express'
import { getUser, updateUser } from '../controllers/userController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/getUser',auth,getUser)
router.put('/updateUser',auth,updateUser)

export default router