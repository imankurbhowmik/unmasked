import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaRegCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api/axios";

const PostCard = ({ _id, authorName, content, isAnonymous }) => {
  const navigate = useNavigate();
  const { token, userData } = useSelector((state) => state.auth);

  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchLikeData = async () => {
    try {
      const res = await api.get(`/api/likes/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLikeCount(res.data.count);
    } catch (err) {
      console.error("Error fetching like count", err);
    }
  };

  const handleLike = async () => {
    if (!token || loading) return;
    setLoading(true);
    try {
      await api.post(
        "/api/likes",
        {
          postId: _id,
          isAnonymous,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Optimistic update
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error("Error toggling like", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikeData();
  }, []);

  return (
    <div className="bg-gray-800 text-white p-5 rounded-xl shadow-md mb-4 transition hover:shadow-lg break-words">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold truncate max-w-[90%]">
          {authorName === "Anonymous" ? "Anonymous" : authorName}
        </h3>
      </div>

      <p className="text-gray-300 mb-4 whitespace-pre-wrap break-words">
        {content}
      </p>

      <div className="flex items-center gap-6 text-sm">
        <button
          className={`flex items-center gap-1 ${
            isLiked ? "text-blue-400" : "text-gray-400 hover:text-blue-400"
          }`}
          onClick={handleLike}
        >
          <FaThumbsUp />
          <span>{likeCount}</span>
        </button>

        <button
          className="flex items-center gap-1 text-gray-400 hover:text-green-400"
          onClick={() => 
            navigate(`/post/${_id}`)}
        >
          <FaRegCommentDots />
          <span>Comment</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;


