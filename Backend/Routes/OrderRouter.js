import  express from 'express';
import {createOrder,updateByOrderId}  from '../Controller/OrderController.js';

const router =express.Router();

router.post('/add',createOrder)
router.put('/update',updateByOrderId)

export default router