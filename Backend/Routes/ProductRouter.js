const express = require("express");
const { addProduct, getProducts, updateProduct, deleteProduct } = require("../Controller/ProductController");
const multer = require("multer");
// const path = require('path')

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
  // destination: (req, file, cb) => cb(null, path.join(__dirname,"../Product_uploads/")),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/add", upload.single("product_image"), addProduct);
router.get("/all", getProducts);
router.put("/update/:id", upload.single("product_image"), updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
