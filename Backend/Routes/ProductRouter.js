import express from "express";
import { addProduct, getProducts, updateProduct, deleteProduct } from "../Controller/ProductController.js";
import multer from "multer";
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

export default router;
