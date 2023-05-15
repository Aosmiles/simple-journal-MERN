import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/", userController.registerUser);

router.post("/auth", userController.authUser);

router.get("/logout", userController.logout);

router.get("/profile", userController.getUserProfile);

router.put("/profile", userController.updateUserProfile);

export default router;
