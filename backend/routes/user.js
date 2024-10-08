import express from "express";
import {
  userSignup,
  userLogin,
  getProfile,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", userSignup);

router.post("/login", userLogin);

router.get("/profile", authMiddleware, getProfile);

export default router;
