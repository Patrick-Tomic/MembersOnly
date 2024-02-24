const express = require("express")
const path = require("path")
const session = require("express-session")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const mongoDB = "mongodb+srv://patrick:CoNereNDFReP1@myatlasclusteredu.k4klebz.mongodb.net/membersOnly?retryWrites=true&w=majority'";
mongoose.connect(mongoDB)
const db = mongoose.connectiondb.on("error", console.error.bind(console, 'mongo connection error'))

const memberSchema = mongoose.model(
    "Member",
    new Schema({
        firstName: {type:String, required:true},
        lastName: {type:String, required:true},
        username: {type:String, required:true},
        password: {type:String, required:true},
    })
)

const memberController = require("/src/userController")

const app = express()
app.set("views", __dirname)
app.set("view engine", "ejs")

app.use(session({secret:"dogs", resave:false, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.urlencoded({extended:false}))

app.get("/",(req,res) => res.render("index"))

app.get("/sign-up", (req,res) => res.render('sign-up'))

app.post("/sign-up", memberController.signup_post)



module.exports = mongoose.model("Member", memberSchema)