import express from 'express';
import {deleteCartitems,fetchedCartItems,addCartItems} from '../Controller/CartItemsController.js';

const router = express.Router();


router.post('/add',addCartItems);
router.get('/get',fetchedCartItems);
router.delete('/delete/:id',deleteCartitems)



export default router