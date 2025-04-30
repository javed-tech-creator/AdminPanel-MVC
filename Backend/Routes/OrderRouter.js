const express = require('express')
const{createOrder,updateByOrderId} = require('../Controller/OrderController')

const router =express.Router();

router.post('/add',createOrder)
router.put('/update',updateByOrderId)

module.exports = router