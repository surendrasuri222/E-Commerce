const express = require('express')
const signin = require("../Controllers/signin")
const signup = require("../Controllers/signup")
const userToken = require('../middleware/userVerify')
const userProfile = require('../Controllers/userprofile')
const router = express.Router()

router.post("/signup", signup)
router.post("/", signin)
router.post('/userprofile', userToken, userProfile)
module.exports = router