import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Titles from "../../utilities/Titles";
import PostCards from "../../shared/PostCards/PostCards";
const Media = () => {
  const {
    data: posts,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/posts");
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
      <div>
        {posts.map((post, i) => (
          <PostCards key={i} post={post}></PostCards>
        ))}
      </div>
    </section>
  );
};

export default Media;
