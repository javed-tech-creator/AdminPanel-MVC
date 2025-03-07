const Product = require("../Model/ProductModel");

const addProduct = async (req, res) => {
  try {
    const { product_name, product_price, product_rating } = req.body;
    const product_image = req.file ? req.file.filename : null; // Image upload

    const newProduct = new Product({
      product_name,
      product_price,
      product_rating,
      product_image,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "Product added successfully", savedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (req.file) {
      updateData.product_image = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

module.exports = {addProduct,getProducts,updateProduct,deleteProduct}