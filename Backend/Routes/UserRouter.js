import express from 'express';
const router = express.Router();
import {userLogin,userSignup,userLogout,verifyToken} from "../Controller/UserController.js";
import { fetchAuthUser } from '../Middleware/VarifyToken.js';

router.post('/signup',userSignup)
router.post('/login',userLogin)
router.post('/logout',userLogout)
router.post('/verify',fetchAuthUser,verifyToken)

export default router