import express from "express";
import {
  getCart,
  deleteFromCart,
  addToCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getCart);
router.post("/add", addToCart);
router.delete("/delete/:productId", deleteFromCart);

export default router;
