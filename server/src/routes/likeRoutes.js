import express from "express";
import { toggleLike, getLikeCount, isPostLikedByUser } from "../controllers/likeController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, toggleLike);             // Like/unlike a post
router.get("/:postId", protect, getLikeCount);     // Get like count for a post
router.get("/status/:postId", protect, isPostLikedByUser); // Check if a post is liked by a user

export { router };
