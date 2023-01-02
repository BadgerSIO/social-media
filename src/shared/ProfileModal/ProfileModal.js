import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { AuthContext } from "../../context/AuthProvider";

const ProfileModal = ({ current, setCurrent, refetch }) => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formSubmit = (data) => {
    console.log(data);
    fetch(
      `https://social-media-server-nu.vercel.app/user/${current}?email=${user?.email}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((resData) => {
        refetch();
        console.log(resData);
      });
    setCurrent(null);
  };
  return (
    <>
      <input type="checkbox" id="profileModal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            className="absolute right-2 top-2 cursor-pointer p-2 bg-white/10 rounded-full hover:bg-white/20"
            htmlFor="profileModal"
          >
            <MdClose></MdClose>
          </label>
          <form className="space-y-3" onSubmit={handleSubmit(formSubmit)}>
            <label>Enter {current}</label>
            {current === "bio" ? (
              <textarea
                type="text"
                rows={10}
                className="w-full bg-white/5 p-2 outline-none border border-white/10 focus:border-sky-500/10 focus:bg-sky-500/10"
                {...register("currentInput", { required: true })}
              />
            ) : (
              <input
                type="text"
                className="w-full bg-white/5 p-2 outline-none border border-white/10 focus:border-sky-500/10 focus:bg-sky-500/10"
                {...register("currentInput", { required: true })}
              />
            )}

            {errors?.currentInput && (
              <p className="text-red-500">
                <small>Field is required</small>
              </p>
            )}
            <button className="btn btn-primary btn-sm mt-5">Submit</button>
          </form>
          <div className="modal-action"></div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
