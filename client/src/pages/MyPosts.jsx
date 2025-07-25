import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Header from "../components/Header";
import { FaThumbsUp, FaRegCommentDots, FaTrash } from "react-icons/fa";

const MyPosts = () => {
  const { userData, token, rehydrated } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
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

  const handleLike = async (postId) => {
    try {
      await api.post(
        "/api/likes",
        {
            postId,
            isAnonymous: false
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchMyPosts();
    } catch (err) {
      console.error("Failed to like post:", err);
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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="max-w-3xl mx-auto p-4 space-y-6">
        <h2 className="text-2xl font-semibold mb-4">My Posts</h2>

        {loading && <p className="text-gray-400">Loading your posts...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && posts.length === 0 && (
          <p className="text-gray-400">You haven't posted anything yet.</p>
        )}

        {posts.map((post) => {
          const isLiked = post.likes.includes(userData._id);
          return (
            <div
              key={post._id}
              className="bg-gray-800 p-5 rounded-xl shadow-md mb-4 transition hover:shadow-lg"
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

              <p className="text-gray-300 mb-4">{post.content}</p>

              <div className="flex items-center gap-6 text-sm">
                <button
                  className={`flex items-center gap-1 ${
                    isLiked
                      ? "text-blue-400"
                      : "text-gray-400 hover:text-blue-400"
                  }`}
                  onClick={() => handleLike(post._id)}
                >
                  <FaThumbsUp />
                  <span>{post.likes.length}</span>
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
          );
        })}
      </main>
    </div>
  );
};

export default MyPosts;
