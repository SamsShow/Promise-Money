const express = require("express")
const userRouter = express.Router()
const {getLandingPage , login, signup, showDashboard} = require('../controller/index.js')
userRouter.get('/landingpage', getLandingPage)
.get('/dashboard/:email', showDashboard)
.post('/signup', signup)
.post('/login', login)

module.exports= userRouter