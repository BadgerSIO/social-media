import React from "react";
import { MdClose } from "react-icons/md";
const PostModal = () => {
  return (
    <>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="post-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex justify-between mb-5">
            <h3 className="font-bold text-lg">Create Post</h3>
            <label
              htmlFor="post-modal"
              className="cursor-pointer p-2 bg-white/10 rounded-full hover:bg-white/20"
            >
              <MdClose></MdClose>
            </label>
          </div>
          <form>
            <textarea
              className="w-full bg-white/5 p-3 rounded-md text-sm placeholder:text-gray-500"
              rows={5}
              placeholder="Write whats on your mind"
            ></textarea>
          </form>
          <div className="modal-action">
            <label htmlFor="post-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostModal;
