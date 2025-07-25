import Comment from "../models/Comment.model.js";

export const addComment = async (req, res) => {
  const { postId, content } = req.body;
  const isAnonymous = req.body.isAnonymous === true || req.body.isAnonymous === "true";

  if (!content || content.trim().length === 0) {
    return res.status(400).json({ msg: "Comment cannot be empty." });
  }

  const comment = new Comment({
    postId,
    content,
    isAnonymous,
    authorId: isAnonymous ? null : req.user._id,
    authorName: isAnonymous ? "Anonymous" : req.user.name,
  });

  await comment.save();
  res.status(201).json(comment);
};

export const getCommentsByPost = async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ postId }).sort({ createdAt: 1 });
  res.json(comments);
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);
  if (!comment) return res.status(404).json({ msg: "Comment not found" });

  if (comment.isAnonymous) {
    return res.status(403).json({ msg: "Anonymous comments can't be deleted" });
  }

  if (comment.authorId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ msg: "Not authorized to delete this comment" });
  }

  await comment.deleteOne();
  res.json({ msg: "Comment deleted successfully" });
};