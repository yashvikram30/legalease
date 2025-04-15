import express from "express";
import { register, login, logout, profile } from "../controllers/authController";
import protect from "../middleware/protect";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", protect, profile);

export default router;
