import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";
import api from "../api/axios";

const SinglePost = () => {
  const { id } = useParams();
  const { token, userData } = useSelector((state) => state.auth);

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchPost = async () => {
    try {
      const res = await api.get(`/api/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await api.get(`/api/comments/${id}`);
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
    setLoading(false);
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      await api.post(
        "/api/comments",
        {
          content: newComment,
          isAnonymous,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewComment("");
      setIsAnonymous(false);
      fetchComments();
    } catch (err) {
      setError(err?.response?.data?.msg || "Failed to comment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async () => {
    try {
      await api.post(
        `/api/likes`,
        {
          postId: id,
          isAnonymous: false
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPost();
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  if (loading || !post) return <div className="text-white p-4">Loading...</div>;

  const isLiked = post.likes.includes(userData?._id);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 max-w-2xl mx-auto space-y-6">
      {/* Post */}
      <div className="bg-gray-800 p-5 rounded-xl shadow">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">
            {post.authorName === "Anonymous" ? "Anonymous" : post.authorName}
          </h2>
        </div>
        <p className="text-gray-300 mb-4">{post.content}</p>

        <div className="flex items-center gap-6 text-sm">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 ${
              isLiked ? "text-blue-400" : "text-gray-400 hover:text-blue-400"
            }`}
          >
            <FaThumbsUp />
            <span>{post.likes.length}</span>
          </button>
        </div>
      </div>

      {/* Comment Form */}
      <form
        onSubmit={handleCommentSubmit}
        className="bg-gray-800 p-4 rounded-xl shadow space-y-3"
      >
        <textarea
          rows="3"
          className="w-full bg-gray-900 text-white border border-gray-700 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>

        <div className="flex justify-between items-center">
          <label className="text-sm text-gray-300 flex items-center gap-2">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={() => setIsAnonymous(!isAnonymous)}
              className="accent-blue-500"
            />
            Comment Anonymously
          </label>

          <button
            type="submit"
            disabled={submitting || !newComment.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm disabled:opacity-50"
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>

      {/* Comment Count + List */}
      <div className="text-sm text-gray-400">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-gray-800 p-3 rounded-lg text-sm border border-gray-700"
          >
            <p className="font-semibold text-gray-100">
              {comment.authorName === "Anonymous" ? "Anonymous" : comment.authorName}
            </p>
            <p className="text-gray-300 mt-1">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SinglePost;
