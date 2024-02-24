const express = require("express")
const router = express.Router()

const member_controller = require('./userController')


router.get('/', member_controller.index)

router.get('/sign-up', member_controller.signup_get)
router.post('/sign-up', member_controller.signup_post)

module.exports = router