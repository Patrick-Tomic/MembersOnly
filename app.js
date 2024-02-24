const express = require("express")
const path = require("path")
const session = require("express-session")
const bcrypt = require("bcryptjs")
const passport = require("passport")
 
const mongoose = require("mongoose")
 
const indexRoute = require("./src/indexRoute")
const memberRouter = require('./src/memberRoute')

mongoose.set("strictQuery", false)
const mongoDB = "mongodb+srv://patrick:CoNereNDFReP1@myatlasclusteredu.k4klebz.mongodb.net/membersOnly?retryWrites=true&w=majority'";
mongoose.connect(mongoDB)
const db = mongoose.connection
db.on("error", console.error.bind(console, 'mongo connection error'))



const app = express()
app.set("views", __dirname)
app.set("view engine", "ejs")

app.use(session({secret:"dogs", resave:false, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({extended:false}))

app.use('/', indexRoute)
app.use('/member', memberRouter)
/* app.get("/",(req,res) => res.render("index")) 

app.get("/sign-up", (req,res) => res.render('sign-up'))

app.post("/sign-up", memberController.signup_post)
*/

app.listen(3000, () => console.log("App listening on port 3000"))

 