import express from "express";
import { createPost, getAllPosts, deletePost } from "../controllers/postController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPost);   // create new post
router.get("/", getAllPosts);           // get all posts
router.delete("/:id", protect, deletePost); // delete a post

export { router };
