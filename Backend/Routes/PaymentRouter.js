import {processPayment,getKey,paymentVarification} from '../Controller/PaymentGetway.js';
import express from 'express'
const router = express.Router();

router.post('/process',processPayment);
router.get('/getkey',getKey);
router.post('/varification',paymentVarification)

export default router