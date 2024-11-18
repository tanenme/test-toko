import express from 'express'
import { signin, signup } from '../controllers/usersController.js'


const userRoute = new express.Router()

userRoute.post('/signin', signin)
userRoute.post('/signup', signup)

export default userRoute