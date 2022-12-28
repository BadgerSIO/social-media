import React from "react";
import PostModal from "../../../shared/PostModal/PostModal";

const AddPost = () => {
  return (
    <section className="my-2 p-5 border-y border-gray-700">
      {/* The button to open modal */}
      <label htmlFor="post-modal" className="text-gray-400 cursor-pointer ">
        Whats on your mind?
      </label>
      <PostModal></PostModal>
    </section>
  );
};

export default AddPost;
