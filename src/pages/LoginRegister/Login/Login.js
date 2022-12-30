import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { BiLogInCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
const Login = () => {
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const loginUser = (data) => {
    login(data.userEmail, data.userPass).then((res) => {
      console.log(res);
    });
    reset();
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(loginUser)}
        className="p-7 border border-gray-700 rounded space-y-5"
      >
        <div className="space-y-2">
          <label htmlFor="email">Email</label>
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
          <label htmlFor="password">Password</label>
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
        <div className="flex justify-center mt-5">
          <button className="btn btn-secondary btn-sm flex items-center group hover:bg-sky-500/10 hover:text-sky-500 ">
            <BiLogInCircle className=" mr-1 -mt-1 " /> Login
          </button>
        </div>
      </form>
      <p className="text-center mt-3">
        Not registered? <Link to="register">Signup here</Link>
      </p>
    </>
  );
};

export default Login;
