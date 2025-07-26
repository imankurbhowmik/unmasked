import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";
import api from "../api/axios";

const SinglePost = () => {
  const { id: postId } = useParams();
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
      const res = await api.get(`/api/posts/${postId}`);
      setPost(res.data);
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await api.get(`/api/comments/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  useEffect(() => {
    if (!postId) return;
    fetchPost();
    fetchComments();
    setLoading(false);
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const wordCount = newComment.length;
    if (wordCount > 1800) {
      return setError("Comment cannot exceed 300 words.");
    }

    try {
      setSubmitting(true);
      await api.post(
        "/api/comments",
        {
          content: newComment,
          isAnonymous,
          postId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewComment("");
      setIsAnonymous(false);
      setError("");
      fetchComments();
    } catch (err) {
      setError(err?.response?.data?.msg || "Failed to comment");
    } finally {
      setSubmitting(false);
    }
  };

  const hasUserLiked = () => {
    return post?.likes?.includes(userData?._id);
  };

  const handleLikeToggle = async () => {
    try {
      await api.post(
        `/api/likes`,
        { postId, isAnonymous: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPost();
    } catch (err) {
      console.error("Like/Unlike failed:", err);
    }
  };

  if (loading || !post)
    return <div className="text-white p-4 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center">
      <div className="w-full max-w-2xl px-4 py-6 space-y-6">
        {/* Post */}
        <div className="bg-gray-800 p-5 rounded-xl shadow break-words">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold truncate max-w-[90%]">
              {post.authorName === "Anonymous" ? "Anonymous" : post.authorName}
            </h2>
          </div>
          <p className="text-gray-300 mb-4 whitespace-pre-wrap break-words">
            {post.content}
          </p>
        </div>

        {/* Comment Form */}
        <form
          onSubmit={handleCommentSubmit}
          className="bg-gray-800 p-4 rounded-xl shadow space-y-3"
        >
          <textarea
            rows="3"
            className="w-full bg-gray-900 text-white border border-gray-700 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-pre-wrap break-words"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
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

        {/* Comments Section */}
        <div className="text-sm text-gray-400">
          {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
        </div>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-gray-800 p-3 rounded-lg text-sm border border-gray-700 break-words"
            >
              <p className="font-semibold text-gray-100 mb-1">
                {comment.authorName === "Anonymous"
                  ? "Anonymous"
                  : comment.authorName}
              </p>
              <p className="text-gray-300 whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;

