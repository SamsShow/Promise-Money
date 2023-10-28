const express = require("express")
const userRouter = express.Router()
const {getLandingPage , login, signup} = require('../controller/index.js')
userRouter.get('/landingpage', getLandingPage)
.post('/signup', signup)

module.exports= userRouter
