import express from "express";
import multer from "multer";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController.js";

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

router.post("/", upload.single("image"), createProduct);

router.get("/", getAllProducts);

export default router;
