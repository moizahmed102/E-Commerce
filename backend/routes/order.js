import express from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/checkout", createOrder);
router.get("/all", getOrders);

export default router;
