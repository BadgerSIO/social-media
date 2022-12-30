import { useQuery } from "@tanstack/react-query";
import React from "react";
import Titles from "../../utilities/Titles";
import PostCards from "../../shared/PostCards/PostCards";
const Media = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const res = await fetch(
        "https://social-media-server-nu.vercel.app/posts"
      );
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <section>
      <Titles>Media</Titles>
      {posts?.length > 0 ? (
        <div>
          {posts.map((post, i) => (
            <PostCards key={i} post={post}></PostCards>
          ))}
        </div>
      ) : (
        <div className="p-5">
          <p className="text-white">No post found</p>
        </div>
      )}
    </section>
  );
};

export default Media;
