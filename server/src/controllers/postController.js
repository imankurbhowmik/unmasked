import Post from "../models/Post.model.js";

export const createPost = async (req, res) => {
  const { content } = req.body;
  const isAnonymous = req.body.isAnonymous === true || req.body.isAnonymous === "true"

  if (!content || content.trim().length === 0) {
    return res.status(400).json({ msg: "Post content cannot be empty." });
  }

  const wordCount = content.trim().split(/\s+/).length;
  if (wordCount > 300) {
    return res.status(400).json({ msg: "Post cannot exceed 300 words." });
  }

  const post = new Post({
    content,
    isAnonymous,
    authorId: isAnonymous ? null : req.user._id,
    authorName: isAnonymous ? "Anonymous" : req.user.name,
  });

  await post.save();

  res.status(201).json(post);
};

export const getAllPosts = async (req, res) => {
  const { filter } = req.query;

  let query = {};

  if (filter === "anonymous") {
    query.isAnonymous = true;
  } else if (filter === "named") {
    query.isAnonymous = false;
  }

  const posts = await Post.find(query).sort({ createdAt: -1 });
  res.json(posts);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) return res.status(404).json({ msg: "Post not found" });

  // Can't delete anonymous post
  if (post.isAnonymous) {
    return res.status(403).json({ msg: "Anonymous posts can't be deleted" });
  }

  // Check ownership
  if (post.authorId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ msg: "Not authorized to delete this post" });
  }

  await post.deleteOne();
  res.json({ msg: "Post deleted successfully" });
};

