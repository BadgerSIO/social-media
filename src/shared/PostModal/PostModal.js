import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import moment from "moment";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
const PostModal = ({ setMind }) => {
  const { user } = useContext(AuthContext);
  let imghostKey = process.env.REACT_APP_imgbbkey;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const postSubmit = (data) => {
    const image = data.image[0];
    const formdata = new FormData();
    formdata.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imghostKey}`;
    fetch(url, {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((bbdata) => {
        const post = {
          imageUrl: bbdata.data.display_url,
          postText: data.postText,
          postTime: moment().format("Do MMM YYYY, h:mm a"),
          authorName: user?.displayName,
          authorImage: user?.photoURL,
        };
        fetch("http://localhost:5000/post", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(post),
        })
          .then((res) => res.json())
          .then((resdata) => {
            if (resdata?.acknowledged) {
              return toast.success("Post added");
            }
            toast.error("Failed to post");
          });
      });

    setMind(false);
  };
  return (
    <>
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
          {user ? (
            <form onSubmit={handleSubmit(postSubmit)}>
              <textarea
                className="w-full bg-white/5 p-3 rounded-md text-sm placeholder:text-gray-500"
                rows={5}
                placeholder="Write whats on your mind"
                {...register("postText", { required: true })}
              ></textarea>
              {errors.postText && (
                <p>
                  <small>field is required</small>
                </p>
              )}
              <div className="w-auto relative flex justify-center items-center mt-5">
                <BiImageAdd className="text-2xl mr-2 cursor-pointer" />
                Add images
                <input
                  type="file"
                  className="absolute  top-0 w-32 h-5 opacity-0 cursor-pointer"
                  {...register("image")}
                />
              </div>
              <div className="modal-action">
                <button className="btn w-full">post</button>
              </div>
            </form>
          ) : (
            <>
              <div className="space-y-4">
                <p>Please login to create a post</p>
                <Link className="btn btn-primary btn-sm" to="/login">
                  Login here
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PostModal;
