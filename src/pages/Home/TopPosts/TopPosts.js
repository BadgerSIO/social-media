import { useQuery } from "@tanstack/react-query";
import React from "react";
import PostCards from "../../../shared/PostCards/PostCards";

const TopPosts = () => {
  const { data: posts } = useQuery({
    queryKey: "topPosts",
    queryFn: async () => {
      const res = await fetch(
        `https://social-media-server-nu.vercel.app/topPost`
      );
      const data = await res.json();
      return data;
    },
  });
  return (
    <section className="my-2">
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

export default TopPosts;
