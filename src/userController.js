const Member = require('./models/memberModel')
const bcrypt = require("bcryptjs")
const {body, validationResult} = require("express-validator")
const asyncHandler = require("express-async-handler")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

passport.use(
    new LocalStrategy(async(username, password, done) => {
        try {
            const user = await Member.findOne({username:username})
            if(!user) {
                return done(null, false, {message: "Incorrect Username"})
            }
            const match = await bcrypt.compare(password, user.password)
                if(!match) {
                     return done(null, false, 'Incorrect Password')
                }
                return done(null, user)
            } catch(err) {
                return done(err)
            }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try{
        const user = await Member.findById(id)
        done(null, user)
    } catch(err) {
        done(err)
    }
})

exports.index = asyncHandler(async (req, res, next) => {
    res.render("index")
})

exports.signup_get = asyncHandler( async(req,res,next) => {
    res.render('sign-up', {errors:[]})
})

exports.signup_post = [
    body("firstName", "Please fill in the input").trim()
    .isLength({min:1}).escape(),
    body('lastName', 'Please fill in the input').trim()
    .isLength({min:1}).escape(),
    body('username').trim().custom( async value => {
        const user = await Member.findOne({username:value})
        if(user) {
            throw new Error("username Taken")
        }
    }).escape(),
    body("password", 'Password must be 6 characters long and contain a number and uppercase')
    .trim().isLength({min:6}).escape(),
    body("confirmPassword", 'Repeat your password').trim().custom((value, {req}) =>{
        value === req.body.password ? console.log('works') : new Error('Password doesnt match')
    }).escape()
, asyncHandler(async (req,res,next) => {
    const errors = validationResult(req)
    const hash = await bcrypt.hash(req.body.password, 10)
    const member = new Member({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        username:req.body.username,
        password:hash
    })

    if(!errors.isEmpty()) {
        res.render('sign-up', {errors:errors.array()})
        return
    } else {
        const result = await member.save()
        res.render("index",{member})
    }
})
]