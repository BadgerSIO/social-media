import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { MdAddComment } from "react-icons/md";
import { Link } from "react-router-dom";
const PostCards = ({ post }) => {
  const { postText, imageUrl, _id, authorImage, authorName, postTime } = post;
  return (
    <div className="p-5 first:border-t last:border-b-0 border-b border-gray-700 hover:bg-white/5 space-y-3">
      <div className="mt-5 flex space-x-2">
        <div className="w-14">
          <div className="w-12 mask mask-squircle">
            <img src={authorImage} alt="this" />
          </div>
        </div>
        <div className="flex-grow">
          <h1 className="font-bold">{authorName}</h1>
          <p className="text-[10px] text-primary">{postTime}</p>
        </div>
      </div>
      <h1>{postText}</h1>
      <div className="bg-white/10 rounded-md">
        <img src={imageUrl} alt={postText} className="w-full" />
      </div>

      <div className="flex justify-start space-x-5">
        <div className=" flex justify-start items-center ">
          <AiFillHeart
            className="text-white/30 text-4xl cursor-pointer p-2 rounded-full hover:bg-red-500/10 hover:text-red-500"
            title="Like"
          />
          <span className="ml-1">0</span>
        </div>
        <div className=" flex justify-start items-center ">
          <MdAddComment
            className="text-white/30 text-4xl cursor-pointer p-2 rounded-full hover:bg-green-500/10 hover:text-green-500"
            title="reply"
          />
          <span className="ml-1">0</span>
        </div>
      </div>
      <Link to={`/media/details/${_id}`} className="btn btn-secondary btn-xs">
        See details
      </Link>
    </div>
  );
};

export default PostCards;
