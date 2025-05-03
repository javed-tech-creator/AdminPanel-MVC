import express from 'express';
const router = express.Router();
import {signupUser,loginUser} from '../Controller/AdminController.js';

//signup api
router.post('/signup',signupUser);

// login api 
router.post('/login',loginUser)

export default router