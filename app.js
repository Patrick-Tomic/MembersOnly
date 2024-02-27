const express = require("express")
const app = express()
const path = require("path")
const session = require('express-session')
const bcrypt = require("bcryptjs")
const passport = require("passport")
const flash = require("express-flash")
const mongoose = require("mongoose")
require('dotenv').config()
 

const indexRoute = require("./indexRoute")
const memberRouter = require('./memberRoute')

mongoose.set("strictQuery", false)
const mongoDB = process.env.session_server;
mongoose.connect(mongoDB)
const db = mongoose.connection
db.on("error", console.error.bind(console, 'mongo connection error'))
const initialize = require('./passport-config')

initialize()
 
app.set("views", __dirname)
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:false}))
app.use(session({secret:process.env.session_secret, resave:false, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session()) 
app.use(flash())



app.use('/', indexRoute)
app.use('/member', memberRouter)
 

app.listen(3000, () => console.log("App listening on port 3000"))