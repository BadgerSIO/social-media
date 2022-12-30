import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineForm } from "react-icons/ai";
import { FaUpload } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../../../context/AuthProvider";
import { toast } from "react-hot-toast";

const Register = () => {
  const [file, setFile] = useState([]);
  const navigate = useNavigate();
  const { signup, loading } = useContext(AuthContext);
  let imghostKey = process.env.REACT_APP_imgbbkey;
  const handleChange = (e) => {
    setFile([...file, e.target.files[0]]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const signinUser = (data) => {
    if (file.length) {
      const image = file[0];
      const formdata = new FormData();
      formdata.append("image", image);
      const url = `https://api.imgbb.com/1/upload?key=${imghostKey}`;
      fetch(url, {
        method: "POST",
        body: formdata,
      })
        .then((res) => res.json())
        .then((bbdata) => {
          let imageUrl = bbdata.data.display_url;
          let registerTime = moment().format("Do MMM YYYY, h:mm a");
          let submitToDb = { ...data, registerTime };
          delete submitToDb.userPass;
          //firebase signup
          const profile = {
            displayName: data.username,
            photoURL: imageUrl,
          };
          signup(data.userEmail, data.userPass, profile)
            .then((res) => {
              console.log(res);
              addToDb(submitToDb);
              navigate("/");
            })
            .catch((err) => console.log(err));
        });
    }

    reset();
  };
  const addToDb = (userInfo) => {
    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((resdata) => {
        if (resdata?.acknowledged) {
          return toast.success("Registered Successfully");
        }
        toast.error("Failed to Register");
      });
  };
  const fileInputRef = useRef(null);
  const handleButtonClick = (e) => {
    fileInputRef.current.click();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(signinUser)}
        className="p-7 border border-gray-700 rounded space-y-5"
      >
        <div className="space-y-2">
          <label className="capitalize" htmlFor="name">
            name
          </label>
          <input
            type="text"
            id="name"
            className="w-full bg-white/5 focus:bg-sky-500/10 focus:border-sky-500 border border-white/5 focus:outline-none p-2"
            {...register("username", { required: true })}
          />
          {errors?.username && (
            <p className="text-red-500">
              <small>Field is required</small>
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="capitalize" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full bg-white/5 focus:bg-sky-500/10 focus:border-sky-500 border border-white/5 focus:outline-none p-2"
            {...register("userEmail", { required: true })}
          />
          {errors?.userEmail && (
            <p className="text-red-500">
              <small>Field is required</small>
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="capitalize" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full bg-white/5 focus:bg-sky-500/10 focus:border-sky-500 border border-white/5 focus:outline-none p-2"
            {...register("userPass", { required: true })}
          />
          {errors?.userPass && (
            <p className="text-red-500">
              <small>Field is required</small>
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="capitalize" htmlFor="university">
            university
          </label>
          <input
            type="text"
            id="university"
            className="w-full bg-white/5 focus:bg-sky-500/10 focus:border-sky-500 border border-white/5 focus:outline-none p-2"
            {...register("university", { required: true })}
          />
          {errors?.university && (
            <p className="text-red-500">
              <small>Field is required</small>
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="capitalize" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            id="address"
            className="w-full bg-white/5 focus:bg-sky-500/10 focus:border-sky-500 border border-white/5 focus:outline-none p-2"
            {...register("address", { required: true })}
          />
          {errors?.address && (
            <p className="text-red-500">
              <small>Field is required</small>
            </p>
          )}
        </div>
        <div className="space-y-2 ">
          <input
            type="file"
            id="imageUrl"
            className="hidden"
            ref={fileInputRef}
            onChange={handleChange}
          />
          <div className="text-center">
            <button
              type="button"
              onClick={handleButtonClick}
              className="btn btn-secondary btn-sm "
            >
              <FaUpload className="mr-2 -mt-1" /> Upload Profile picture
            </button>
          </div>
          {errors?.imageUrl && (
            <p className="text-red-500">
              <small>Field is required</small>
            </p>
          )}
        </div>
        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="btn btn-secondary btn-sm flex items-center group hover:bg-sky-500/10 hover:text-sky-500 "
          >
            <AiOutlineForm className=" mr-1 -mt-1 " /> Register
          </button>
        </div>
      </form>
      <p className="text-center mt-3">
        Already registered? <Link to="/login">Login here</Link>
      </p>
    </>
  );
};

export default Register;
