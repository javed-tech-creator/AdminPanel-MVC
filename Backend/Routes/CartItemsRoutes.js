const express = require('express')
const {deleteCartitems,fetchedCartItems,addCartItems} = require('../Controller/CartItemsController')
const multer = require('multer');

const router = express.Router();


router.post('/add',addCartItems);
router.get('/get',fetchedCartItems);
router.delete('/delete/:id',deleteCartitems)



module.exports = router