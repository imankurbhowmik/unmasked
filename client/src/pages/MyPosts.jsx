import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Header from "../components/Header";
import { FaThumbsUp, FaRegCommentDots, FaTrash } from "react-icons/fa";

const MyPosts = () => {
  const { userData, token, rehydrated } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [likedStatus, setLikedStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchMyPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/posts/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (err) {
      setError(err?.response?.data?.msg || "Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  const fetchLikeData = async () => {
    try {
      const counts = {};
      const status = {};

      await Promise.all(
        posts.map(async (post) => {
          const [countRes, statusRes] = await Promise.all([
            api.get(`/api/likes/${post._id}`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            api.get(`/api/likes/status/${post._id}`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

          counts[post._id] = countRes.data.count;
          status[post._id] = statusRes.data.isLiked;
        })
      );

      setLikeCounts(counts);
      setLikedStatus(status);
    } catch (err) {
      console.error("Error fetching like data", err);
    }
  };

  const handleLike = async (postId, isAnonymous) => {
    try {
      await api.post(
        "/api/likes",
        { postId, isAnonymous },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchLikeData(); // Refetch both count and status
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMyPosts();
    } catch (err) {
      alert(err?.response?.data?.msg || "Failed to delete post.");
    }
  };

  useEffect(() => {
    if (rehydrated && userData) {
      fetchMyPosts();
    }
  }, [rehydrated]);

  useEffect(() => {
    if (posts.length > 0) {
      fetchLikeData();
    }
  }, [posts]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <h2 className="text-2xl font-semibold mb-4">My Posts</h2>

        {loading && <div className="flex justify-center items-center py-6">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && posts.length === 0 && (
          <p className="text-gray-400">You haven't posted anything yet.</p>
        )}

        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-gray-800 p-5 rounded-xl shadow-md transition hover:shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">
                {post.isAnonymous ? "Anonymous" : post.authorName}
              </h3>
              {!post.isAnonymous && (
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-red-500 hover:text-red-600"
                  title="Delete Post"
                >
                  <FaTrash />
                </button>
              )}
            </div>

            <p className="text-gray-300 mb-4 whitespace-pre-wrap break-words">
              {post.content}
            </p>

            <div className="flex items-center gap-6 text-sm">
              <button
                className={`flex items-center gap-1 transition ${
                  likedStatus[post._id]
                    ? "text-blue-400"
                    : "text-gray-400 hover:text-blue-400"
                }`}
                onClick={() => handleLike(post._id, post.isAnonymous)}
              >
                <FaThumbsUp />
                <span>{likeCounts[post._id] || 0}</span>
              </button>

              <button
                className="flex items-center gap-1 text-gray-400 hover:text-green-400"
                onClick={() => navigate(`/post/${post._id}`)}
              >
                <FaRegCommentDots />
                <span>Comment</span>
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default MyPosts;



