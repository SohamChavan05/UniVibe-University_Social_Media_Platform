import express from 'express'
import { getAllUser, login, logout, register } from '../controllers/userLogin.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/getAllUser',getAllUser)
router.post('/register',register)
router.post('/login',login)
router.post('/logout/:id',auth,logout)

export default router