import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../api/axios";

const CreatePost = ({ refreshPosts }) => {
  const { token, userData } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!userData) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const wordCount = content.trim().split(/\s+/).length;
    if (wordCount > 300) {
      return setError("Post cannot exceed 300 words.");
    }

    try {
      setLoading(true);
      await api.post(
        "/api/posts",
        { content, isAnonymous },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContent("");
      setIsAnonymous(false);
      if (refreshPosts) refreshPosts(); //Re-fetch posts
    } catch (err) {
      setError(err?.response?.data?.msg || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 rounded-2xl p-4 shadow-md"
    >
      <textarea
        className="w-full bg-gray-900 text-white border border-gray-700 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <div className="flex justify-between items-center mt-4">
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={() => setIsAnonymous(!isAnonymous)}
            className="accent-blue-500"
          />
          Post Anonymously
        </label>

        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </form>
  );
};

export default CreatePost;

