import React from "react";
import { BiHomeCircle, BiLogInCircle } from "react-icons/bi";
import { FaGoogle } from "react-icons/fa";
import { CgFeed } from "react-icons/cg";
import { Link, Outlet } from "react-router-dom";
const LoginRegister = () => {
  return (
    <section>
      <div className="container h-screen flex flex-col justify-center p-3">
        <nav className=" lg:w-2/3 mx-auto pb-5  ">
          <ul className="flex  justify-center space-x-5">
            <li>
              <Link
                to="/"
                className="flex items-center space-x-2 hover:bg-white/20 p-2 rounded"
              >
                <BiHomeCircle className="text-2xl" />{" "}
                <span className="hidden lg:block">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/media"
                className="flex items-center space-x-2 hover:bg-white/20 p-2 rounded"
              >
                <CgFeed className="text-2xl" />{" "}
                <span className="hidden lg:block ">Media</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="w-full md:w-[500px] mx-auto mt-5 content-center">
          <div>
            <Outlet />
            <div className="text-center my-3">
              <p>OR</p>
              <button className="btn btn-secondary btn-sm absolute left-2/4 -translate-x-2/4 flex justify-center items-center hover:bg-gradient-to-r from-yellow-500/20 via-indigo-500/20  to-red-500/20 ">
                <FaGoogle className="mr-2 -mt-1" /> Signin with google
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginRegister;
