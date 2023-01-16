import { useQuery } from "@tanstack/react-query";
import axios from "../../axios";
import React, { useContext } from "react";
import { AiFillHeart } from "react-icons/ai";
import { MdAddComment } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
const PostCards = ({ post }) => {
  const { user } = useContext(AuthContext);
  const { postText, imageUrl, _id, authorImage, authorName, postTime } = post;
  const {
    data: reviews,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comment"],
    queryFn: async () => {
      const res = await axios.get(`/comment/${_id}`);
      return res.data;
    },
  });

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
      <p className="text-sm lg:text-base">{postText}</p>
      <div className="bg-white/10 rounded-md">
        <img src={imageUrl} alt={postText} className="w-full" />
      </div>
      {/* like and comments data */}
      <div className="flex justify-start space-x-5">
        <div className=" flex justify-start items-center ">
          <AiFillHeart
            className={`${
              post?.likes?.includes(user?.email)
                ? "text-red-500 text-4xl cursor-pointer p-2 rounded-full  "
                : "text-white/30 text-4xl cursor-pointer p-2 rounded-full"
            } `}
            title="Like"
          />
          <span className="ml-1">
            {post?.quantity ? (
              post.quantity
            ) : (
              <span className="text-xs">Be the first one</span>
            )}
          </span>
        </div>
        <div className=" flex justify-start items-center ">
          <MdAddComment
            className="text-white/30 text-4xl cursor-pointer p-2 rounded-full hover:bg-green-500/10 hover:text-green-500"
            title="reply"
          />
          <span className="ml-1">{reviews.length}</span>
        </div>
      </div>
      <Link to={`/media/details/${_id}`} className="btn btn-secondary btn-xs">
        See details
      </Link>
    </div>
  );
};

export default PostCards;
