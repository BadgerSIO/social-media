import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ScrollRestoration, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import axios from "../../axios";
import ReviewCard from "./ReviewCard";
import { AiFillHeart } from "react-icons/ai";
import { MdAddComment } from "react-icons/md";
import Loader from "../../utilities/Loader";

const PostDetails = () => {
  const post = useLoaderData();
  const { imageUrl, postText, postTime, _id, authorImage, authorName } = post;

  const {
    data: postThis,
    isLoading: loadingLike,
    refetch: likeRefetch,
  } = useQuery({
    queryKey: ["posts", "_id"],
    queryFn: async () => {
      const res = await axios.get(`/posts/${_id}`);
      return res.data;
    },
  });
  const { user } = useContext(AuthContext);
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const addComment = (data) => {
    data["authorName"] = user?.displayName;
    data["authorEmail"] = user?.email;
    data["authorImage"] = user?.photoURL;
    data["postedTime"] = moment().format("Do MMM YYYY, h:mm a");
    data["postId"] = _id;
    fetch("https://social-media-server-nu.vercel.app/comment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((reviewData) => {
        refetch();
        reset();
      });
  };
  //handle like
  const handleLike = () => {
    fetch(
      `https://social-media-server-nu.vercel.app/posts/like/${_id}?email=${user?.email}`,
      {
        method: "PUT",
      }
    )
      .then((res) => res.json())
      .then((updateresult) => {
        likeRefetch();
      })
      .catch((err) => console.error(err));
  };
  if (isLoading || loadingLike) {
    return <Loader />;
  }
  return (
    <section>
      <div className=" flex space-x-2 sticky px-5 pt-5 pb-1 top-0 bg-black/10 backdrop-blur-lg">
        <div className="w-14">
          <div className="w-12 mask mask-squircle">
            <img src={authorImage} alt="this" />
          </div>
        </div>
        <div className="flex-grow">
          <h1 className="font-bold">{authorName}</h1>
          <p className="text-[10px] text-primary font-semibold">
            <span className="text-white"> Posted On:</span> {postTime}
          </p>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <p className="text-sm lg:text-base">{postText}</p>
        <div className="bg-white/10 rounded-md">
          <img src={imageUrl} alt={postText} className="w-full" />
        </div>
        {/* <p>
          <small>Posted on : {postTime}</small>
        </p> */}
        <div className="flex justify-start space-x-5">
          <div
            onClick={handleLike}
            className=" flex justify-start items-center "
          >
            <AiFillHeart
              className={`${
                postThis?.likes?.includes(user?.email)
                  ? "text-red-500 text-4xl cursor-pointer p-2 rounded-full  "
                  : "text-white/30 text-4xl cursor-pointer p-2 rounded-full hover:bg-red-500/10 hover:text-red-500"
              } `}
              title="Like"
            />
            <span className="ml-1">
              {postThis?.quantity ? (
                postThis.quantity
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
        <form onSubmit={handleSubmit(addComment)}>
          <textarea
            placeholder="Add a comment"
            className="w-full bg-white/5 p-2 outline-none border border-white/10 focus:bg-sky-500/10 focus:border-sky-500 text-sm"
            {...register("comment", { required: true })}
          />
          {errors.comment && (
            <p>
              <small>Field is empty</small>
            </p>
          )}
          <div className="flex justify-end mt-3">
            <button className="btn btn-primary btn-xs">Submit</button>
          </div>
        </form>
      </div>
      {reviews ? (
        reviews.map((review, id) => <ReviewCard key={id} review={review} />)
      ) : (
        <p>No reviews yet</p>
      )}
      <ScrollRestoration />
    </section>
  );
};

export default PostDetails;
