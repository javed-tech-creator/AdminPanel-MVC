const {processPayment,getKey,paymentVarification} = require('../Controller/PaymentGetway');
const express = require('express')
const router = express.Router();

router.post('/process',processPayment);
router.get('/getkey',getKey);
router.post('/varification',paymentVarification)
module.exports = router