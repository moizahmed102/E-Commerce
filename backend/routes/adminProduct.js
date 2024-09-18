import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} from "../controllers/adminProduct.js";
import multer from "multer";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js"; // New middleware for admin

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.use(authMiddleware); // Ensure the user is authenticated
router.use(adminMiddleware); // Ensure the user has admin privileges

// Admin routes
router.post("/create", upload.single("image"), createProduct);
router.put("/update/:productId", updateProduct);
router.delete("/delete/:productId", deleteProduct);
router.get("/products", getProducts);

export default router;
