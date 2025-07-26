import express from "express";
import { getUserById } from "../controllers/anotherUserController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET /api/users/:id
router.get("/:id", protect, getUserById);

export { router };
