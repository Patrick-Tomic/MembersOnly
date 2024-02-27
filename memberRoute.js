const express = require("express")
const router = express.Router()
const passport = require("passport")

 
const app = require("./memberController")

router.get('/', app.index)

router.get('/sign-up', app.signup_get)
router.post('/sign-up', app.signup_post)
 
router.get('/login', app.login_get)
router.post("/login", passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:"/member/login",
    failureFlash:true
}))
module.exports = router