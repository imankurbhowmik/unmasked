import express from "express";
import { addComment, getCommentsByPost, deleteComment } from "../controllers/commentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addComment);             // Add comment
router.get("/:postId", protect, getCommentsByPost);         // Get all comments for a post
router.delete("/:id", protect, deleteComment);             // Delete a comment

export { router };
