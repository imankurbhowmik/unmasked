import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaRegCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api/axios";
import { Link } from "react-router-dom";

const PostCard = ({ _id, authorId, authorName, content, isAnonymous }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchLikeData = async () => {
    try {
      const countRes = await api.get(`/api/likes/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLikeCount(countRes.data.count);

      const statusRes = await api.get(`/api/likes/status/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsLiked(statusRes.data.isLiked);
    } catch (err) {
      console.error("Error fetching like data", err);
    }
  };

  const handleLike = async () => {
    if (!token || loading) return;
    setLoading(true);
    try {
      await api.post(
        "/api/likes",
        { postId: _id, isAnonymous },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchLikeData(); // Re-sync after like/unlike
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
      <h3 className="text-blue-400 text-lg font-semibold truncate max-w-[90%]">
    {authorName !== "Anonymous" && authorId ? (
      <Link
        to={`/user/${authorId}`}
        className="text-blue-400"
      >
        {authorName}
      </Link>
    ) : "Anonymous"}
  </h3>
</div>


      <p className="text-gray-300 mb-4 whitespace-pre-wrap break-words">
        {content}
      </p>

      <div className="flex items-center gap-6 text-sm">
        <button
          className={`flex items-center gap-1 transition ${
            isLiked ? "text-blue-400" : "text-gray-400 hover:text-blue-400"
          }`}
          onClick={handleLike}
        >
          <FaThumbsUp />
          <span>{likeCount}</span>
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



