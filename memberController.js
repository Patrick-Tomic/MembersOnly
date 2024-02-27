const Member = require('./models/memberModel')
const {body, validationResult} = require("express-validator") 
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")


exports.index = asyncHandler(async (req, res, next) => {
    res.render("./views/index")
})

exports.signup_get = asyncHandler( async(req,res,next) => {
    res.render('./views/sign-up', {errors:[]})
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
    .trim().isLength({min:6}),
    body("confirmPassword").custom((value, {req}) =>{
        return value === req.body.password
    }) 
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
        res.render('./views/sign-up', {errors:errors.array()})
        return
    } else {
        const result = await member.save().done(res.redirect('/'))
         
    }
})
]

exports.login_get = asyncHandler(async (req, res, next) => {
    res.render("./views/login")
})