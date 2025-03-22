const Product = require("../Model/ProductModel");
const { v2: cloudinary } = require('cloudinary');
const fs = require('fs')

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: 'drdefwda9', 
  api_key: '948565595918736', 
  api_secret: 'kPWiuSUHm6Zj_E0WvdoyATG60-E' // Replace with actual secret
});


const addProduct = async (req, res) => {
  try {
    const { product_name, product_price, product_rating } = req.body;
    const product_image = req.file ? req.file.filename : null; // Image upload

    // Upload image to Cloudinary
       const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: 'products', // Organize uploads into a 'sliders' folder
        public_id: `product_${Date.now()}`, // Unique name
        use_filename: true,
    });
        // Remove the file from local storage after upload
        fs.unlinkSync(req.file.path);

    const newProduct = new Product({
      product_name,
      product_price,
      product_rating,
      public_id:cloudinaryResponse.public_id, // Store public_id for future deletions
      product_image:cloudinaryResponse.secure_url, // Store Cloudinary URL
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
  
      // Get existing product
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      if (req.file) {
        console.log("Uploaded file path:", req.file.path);
  
        // Delete old image from Cloudinary if it exists
        if (product.public_id) {
          await cloudinary.uploader.destroy(product.public_id);
        }
  
        // Upload new image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "products",
          public_id: `product_${Date.now()}`,
          use_filename: true,
        });
  
        // Remove local file safely
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        } else {
          console.log("File not found for deletion:", req.file.path);
        }
  
        updateData.product_image = result.secure_url;
        updateData.public_id = result.public_id;
      }
  
      // Update product in database
      const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
  
      res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Error updating product", error: error.message });
    }
  };
  


const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(product.public_id);

    // Delete from database
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Slider deleted successfully" });

} catch (error) {
    res.status(500).json({ error: error.message });
}
};

module.exports = {addProduct,getProducts,updateProduct,deleteProduct}