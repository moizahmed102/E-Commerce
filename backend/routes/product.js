import express from "express";
import multer from "multer";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

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

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createProduct
);

router.get("/", getProducts);

router.put(
  "/:productId",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateProduct
);

router.delete("/:productId", authMiddleware, adminMiddleware, deleteProduct);

export default router;
