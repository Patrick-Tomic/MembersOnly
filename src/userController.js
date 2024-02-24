const Member = require("/app")
const bcrypt = require("bcryptjs")
const {body, validationResult} = require("express-validator")
const asyncHandler = require("express-async-handler")

exports.signup_post = [
    body("firstName", "Please fill in the input").trim()
    .isLength({min:1}).escape(),
    body('lastName', 'Please fill in the input').trim()
    .isLength({min:1}).escape(),
    body('username').trim().custom(async (req,res,next) => {
        const user = await Member.findOne(req.body.username)
        if(user) {
            throw new Error("username Taken")
        }
    }).escape(),
    body("password", 'Password must be 6 characters long and contain a number and uppercase')
    .trim().isLength({min:6}).custom( async (res,req) => {
        const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
        const password = req.body.password
        if(!password.match(passw)){throw new Error('Bad password')}
    }),
    body("confirmPassword", 'Repeat your password').trim().custom((req,res) =>{
        req.body.password === req.body.confirmPassword ? console.log('works') : new Error('Password doesnt match')
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
        res.render('sign-up', {errors:errors.array()})
        return
    } else {
        await member.save()
        res.render("index",{member})
    }
})
]