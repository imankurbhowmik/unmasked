import Like from "../models/Like.model.js";

export const toggleLike = async (req, res) => {
  const { postId } = req.body;
  const isAnonymous = req.body.isAnonymous === true || req.body.isAnonymous === "true";

  try {
    let existingLike = await Like.findOne({
      postId,
      authorId: isAnonymous ? null : req.user._id,
      isAnonymous,
    });

    if (existingLike) {
      // If already liked, remove like (toggle off)
      await existingLike.deleteOne();
      return res.json({ msg: "Unliked" });
    } else {
      // Else, create a new like
      const newLike = new Like({
        postId,
        authorId: isAnonymous ? null : req.user._id,
        isAnonymous,
      });

      await newLike.save();
      return res.status(201).json({ msg: "Liked" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getLikeCount = async (req, res) => {
  const { postId } = req.params;

  const count = await Like.countDocuments({ postId });
  res.json({ count });
};

export const isPostLikedByUser = async (req, res) => {
  const { postId } = req.params;

  try {
    // Check for both anonymous and named likes
    const like = await Like.findOne({
      postId,
      $or: [
        { authorId: req.user._id, isAnonymous: false },
        { authorId: null, isAnonymous: true },
      ],
    });

    const isLiked = !!like;
    res.json({ isLiked });
  } catch (err) {
    console.error("Error checking like status:", err);
    res.status(500).json({ msg: "Failed to check like status" });
  }
};
