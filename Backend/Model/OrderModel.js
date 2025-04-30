const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  street: String,
  city: String,
  state: String,
  pin: String,
  country: String,
});

const ItemCartSchema = new mongoose.Schema({
  _id: String,
  product_category: String,
  product_price: Number,
  product_quantity: Number,
  product_rating: Number,
  product_image: String,
  product_name: String,
  product_description:String,
  total_price:Number

});

const OrderSchema = new mongoose.Schema({
  orderId: String,
  reference: String,
  payment_status: String,
  total_amount: Number,
  payment_method: { type: String },
  cartItem: [ItemCartSchema],
  shippingAddress: AddressSchema,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Order", OrderSchema);
