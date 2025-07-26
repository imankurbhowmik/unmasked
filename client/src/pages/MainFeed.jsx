import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import CreatePost from "../components/CreatePost";
import FeedFilters from "../components/FeedFilters";
import PostCard from "../components/PostCard";
import api from "../api/axios";
import { useSelector } from "react-redux";

const MainFeed = () => {
  const { userData, token } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchPosts = async () => {
    try {
      const res = await api.get(`/api/posts${filter !== "all" ? `?filter=${filter}` : ""}`);
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const handleLike = async (postId) => {
    try {
      await api.post(`/posts/${postId}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPosts();
    } catch (err) {
      console.error("Failed to like post", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="max-w-3xl mx-auto p-4 space-y-6">
        <CreatePost refreshPosts={fetchPosts} />
        <FeedFilters selected={filter} setSelected={setFilter} />
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post._id}
              authorId={post.authorId}
              {...post}
              currentUserId={userData?._id}
              onLike={handleLike}
            />
          ))
        ) : (
          <p className="text-gray-400 text-center mt-10">No posts found.</p>
        )}
      </main>
    </div>
  );
};

export default MainFeed;

