const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
  product_name: {
    type: String,
    required: true, // Makes product_name required
    trim: true,
  },
  product_price: {
    type: Number,
    required: true, // Product price is mandatory
    min: 0, // Price should not be negative
  },
  product_rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5, // Rating should be between 0 and 5
  },
  product_image: {
    type: String, // Store image file name or URL
    default: null, // Default is null if no image is provided
  },
  _id:{
    type: String,
    required:true
  }
})

const cartModel = mongoose.model('cartModel',cartSchema);
module.exports = cartModel;