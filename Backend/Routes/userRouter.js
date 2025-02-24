const express = require('express')
const router = express.Router();
const {signupUser,loginUser} = require('../Controller/userController')

//signup api
router.post('/singup',signupUser);

// login api 
router.post('/login',loginUser)

module.exports = router