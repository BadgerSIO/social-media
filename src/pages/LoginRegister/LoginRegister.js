import React, { useContext } from "react";
import { BiHomeCircle, BiLogInCircle } from "react-icons/bi";
import { FaGoogle } from "react-icons/fa";
import { CgFeed } from "react-icons/cg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";
import moment from "moment";
const LoginRegister = () => {
  const navigate = useNavigate();
  const { googleSignUp } = useContext(AuthContext);
  const handleGoogleSignUp = () => {
    googleSignUp().then((res) => {
      const user = res.user;
      const userInfo = {
        username: user.displayName,
        userEmail: user.email,
        registerTime: moment().format("Do MMM YYYY, h:mm a"),
        // address: prompt("Enter your address"),
        // university: prompt("please enter your university"),
      };
      addToDb(userInfo);
    });
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
          toast.success("Registered Successfully");
          return navigate("/");
        }
        toast.error("Failed to Register");
      });
  };
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
              <button
                onClick={handleGoogleSignUp}
                className="btn btn-secondary btn-sm absolute left-2/4 -translate-x-2/4 flex justify-center items-center hover:bg-gradient-to-r from-yellow-500/20 via-indigo-500/20  to-red-500/20 "
              >
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
