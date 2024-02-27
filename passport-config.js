const LocalStrategy = require('passport-local').Strategy
const bcrypt = require("bcryptjs")
const passport = require('passport')
const Member = require("./models/memberModel")
function initialize(){
passport.use(
    new LocalStrategy(async(username, password, done) => {
        
            const user = await Member.findOne({username:username})
            if(!user) {
                return done(null, false, {message: "Incorrect Username"})
            }
            const match = await bcrypt.compare(password, user.password)
                if(!match) {
                     return done(null, false, 'Incorrect Password')
                }
                return done(null, user)
          
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
}
module.exports = initialize