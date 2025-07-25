import express from "express";
import { toggleLike, getLikeCount } from "../controllers/likeController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, toggleLike);             // Like/unlike a post
router.get("/:postId", protect, getLikeCount);     // Get like count for a post

export { router };
