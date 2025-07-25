import PostCard from "./PostCard";

{posts.map((post) => (
  <PostCard
    key={post._id}
    {...post}
    currentUserId={userData._id}
    onLike={handleLike}
  />
))}
