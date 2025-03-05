const express = require('express')
const router = express.Router();
const {signupUser,loginUser} = require('../Controller/AdminController')

//signup api
router.post('/signup',signupUser);

// login api 
router.post('/login',loginUser)

module.exports = router