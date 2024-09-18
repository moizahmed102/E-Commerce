import express from "express";
import { getAllOrders } from "../controllers/adminOrder.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.use(authMiddleware); // Ensure the user is authenticated
router.use(adminMiddleware); // Ensure the user has admin privileges

// Admin route to get all orders
router.get("/orders", getAllOrders);

export default router;
