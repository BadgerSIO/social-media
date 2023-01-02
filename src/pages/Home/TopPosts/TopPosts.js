import { useQuery } from "@tanstack/react-query";
import axios from "../../../axios";
import React from "react";
import PostCards from "../../../shared/PostCards/PostCards";
import Loader from "../../../utilities/Loader";

const TopPosts = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["topPosts"],
    queryFn: async () => {
      const { data } = await axios.get(`/topPost`);
      return data;
    },
  });
  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }
  return (
    <section>
      {posts?.length > 0 ? (
        <div>
          <h2 className="p-5 border-b border-gray-700 bg-sky-500/10 capitalize">
            Top 3 Trending post
          </h2>
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
