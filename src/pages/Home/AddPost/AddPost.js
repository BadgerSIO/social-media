import React, { useState } from "react";
import PostModal from "../../../shared/PostModal/PostModal";

const AddPost = () => {
  const [mind, setMind] = useState(false);
  return (
    <section className="mt-2 p-5 border-y border-gray-700">
      {/* The button to open modal */}
      <label
        onClick={() => setMind(true)}
        htmlFor="post-modal"
        className="text-gray-400 cursor-pointer "
      >
        <span className="animate-ping absolute -translate-y-[2px] -translate-x-2">
          |
        </span>
        Whats on your mind?
      </label>
      {mind ? <PostModal setMind={setMind}></PostModal> : <></>}
    </section>
  );
};

export default AddPost;
