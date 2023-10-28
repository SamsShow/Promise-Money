const express = require("express")
const userRouter = express.Router()
const {getLandingPage} = require('../controller/index.js')
userRouter.get('/landingpage', getLandingPage)

module.exports= userRouter
