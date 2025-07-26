import express from "express";
import { createPost, getAllPosts, deletePost, getMyPosts, getPostById, getMyPostCount, getPostsByUserId, getAnotherUserPostCount } from "../controllers/postController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPost);   // create new post
router.get("/", getAllPosts);           // get all posts
router.delete("/:id", protect, deletePost); // delete a post
router.get("/mine", protect, getMyPosts);
router.get("/user/:userId", protect, getPostsByUserId);
router.get("/:id", getPostById);
router.get("/count/mine", protect, getMyPostCount);
router.get("/count/user/:userId", protect, getAnotherUserPostCount);


export { router };
