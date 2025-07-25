import React from "react";
import { FaThumbsUp, FaRegCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PostCard = ({
  _id,
  authorName,
  content,
  likes = [],
  onLike,
  currentUserId,
}) => {
  const navigate = useNavigate();
  const isLiked = likes.includes(currentUserId);

  return (
    <div className="bg-gray-800 text-white p-5 rounded-xl shadow-md mb-4 transition hover:shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">
          {authorName === "Anonymous" ? "Anonymous" : authorName}
        </h3>
      </div>
      <p className="text-gray-300 mb-4">{content}</p>
      <div className="flex items-center gap-6 text-sm">
        <button
          className={`flex items-center gap-1 ${
            isLiked ? "text-blue-400" : "text-gray-400 hover:text-blue-400"
          }`}
          onClick={() => onLike(_id)}
        >
          <FaThumbsUp />
          <span>{likes.length}</span>
        </button>
        <button
          className="flex items-center gap-1 text-gray-400 hover:text-green-400"
          onClick={() => navigate(`/post/${_id}`)}
        >
          <FaRegCommentDots />
          <span>Comment</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
