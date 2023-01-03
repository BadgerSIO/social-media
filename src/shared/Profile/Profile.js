import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { FaUniversity } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import axios from "../../axios";
import Loader from "../../utilities/Loader";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["userinfo", "email", user],
    queryFn: async () => {
      const { data } = await axios.get(`/userinfo?email=${user?.email}`);
      return data;
    },
    refetchOnWindowFocus: false,
  });
  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <section className="relative h-auto">
        <h1 className="text-lg capitalize text-center font-bold">Profile</h1>
        {user && userInfo ? (
          <div className="card w-full bg-white/10 shadow-xl border p-3 border-gray-700 ">
            <figure>
              <div className="avatar online">
                <div className="w-20 drop-shadow-md  mask mask-squircle">
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName}
                    className="w-20 "
                  />
                </div>
              </div>
            </figure>
            <div className="card-body text-center">
              <h2 className=" text-center text-lg font-semibold">
                {user?.displayName}
              </h2>
              {userInfo?.university && (
                <p className="flex flex-col justify-center items-center text-sm capitalize">
                  <FaUniversity className="text-xl mb-3" />
                  <span>{userInfo?.university}</span>
                </p>
              )}
              {userInfo?.address && (
                <p className="flex flex-col justify-center items-center text-sm my-2 capitalize">
                  <GoHome className="text-xl mb-3" />{" "}
                  <span>{userInfo?.address}</span>
                </p>
              )}

              <div className="card-actions justify-center">
                <button className="btn btn-secondary btn-sm flex justify-center items-center hover:bg-sky-500/20">
                  <FiEdit className="mr-1 -mt-1" />
                  <Link to="/profile">Edit Profile</Link>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <p>You are not logged in</p>

            <Link className="btn btn-primary btn-sm" to="/login">
              Login here
            </Link>
          </div>
        )}
      </section>
    );
  }
};

export default Profile;
