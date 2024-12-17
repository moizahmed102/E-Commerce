import express from "express";
import {
  getAllOrdersForAdmin,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/adminOrder.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/orders", getAllOrdersForAdmin);

router.put("/orders/:orderId/status", updateOrderStatus);

router.delete("/orders/:orderId", deleteOrder);

export default router;
