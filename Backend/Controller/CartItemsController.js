const cartModel = require('../Model/CartItems');


const addCartItems = async(req,res)=>{
try {
  const { product_name, product_price, product_rating,product_image,_id,total_price,product_category, product_description,product_quantity }=req.body;
 

  const addedItems = new cartModel({
    product_name,
    product_price,
    product_rating,
    product_image,
    total_price,
    product_category, 
    product_description,
    product_quantity,
    _id
  })
  const savedItems = await addedItems.save();
  res.status(200).json({message:'cartItems Added Successfully',savedItems})
  
} catch (error) {
  res.status(500).json({message:'Error During Adding the Cart Items',error})
}
}

const fetchedCartItems = async(req,res)=>{
  try {
  const fetchedData = await cartModel.find();
  if(!fetchedData){
    return res.status(404).json({message:'No Data Found in Cart'})
  }
  res.status(200).json({message:'Fetched Cart Data Successfully',fetchedData})
    
  } catch (error) {
    res.status(500).json({message:'Error During Fetching the Cart Items',error})
  }
}

const deleteCartitems = async(req,res)=>{
  try {
    const {id} = req.params;
    const deletedItems = await cartModel.findByIdAndDelete(id); 
    if(!deletedItems){
      res.status(404).json({message:'Item Not Found'})
    }
    res.status(201).json({message:'Deleted Cart Item Successfully'})

  } catch (error) {
    res.status(500).json({message:'Error During Deleting the Cart Items',error})

  }
}

module.exports = {deleteCartitems,fetchedCartItems,addCartItems}