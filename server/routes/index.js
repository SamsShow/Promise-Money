const express = require("express")
const userRouter = express.Router()
const {getLandingPage , login, signup, sendLoginFile, sendSignUpFile} = require('../controller/index.js')
userRouter.get('/landingpage', getLandingPage)
// .get('/loginform', sendLoginFile)
// .get('/signupform', sendSignUpFile)
.post('/signup', signup)
.post('/login', login)

module.exports= userRouter