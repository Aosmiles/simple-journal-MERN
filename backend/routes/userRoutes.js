import express from "express";
import userController from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", userController.registerUser);

router.post("/auth", userController.authUser);

router.post("/logout", userController.logout);

router.get("/profile", authenticate, userController.getUserProfile);

router.put("/profile", authenticate, userController.updateUserProfile);

export default router;
