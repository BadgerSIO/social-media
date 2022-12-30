import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { FaUniversity } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import Titles from "../../utilities/Titles";

const Profile = () => {
  const { user, loaidng } = useContext(AuthContext);
  const {
    data: userInfo,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(
        `https://social-media-server-nu.vercel.app/user/${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });
  refetch();
  if (loaidng || isLoading) {
    return <p>Loading</p>;
  }
  return (
    <section className="relative h-auto">
      <div className="text-center">
        <Titles>User Profile</Titles>
      </div>
      {user ? (
        <div className="card w-full bg-white/10 shadow-xl border p-3 border-gray-700 ">
          <figure>
            <div className="avatar online">
              <div className="w-20 drop-shadow-md  mask mask-squircle">
                <img src={user?.photoURL} alt={user?.displayName} />
              </div>
            </div>
          </figure>
          <div className="card-body text-center">
            <h2 className=" text-center text-lg font-semibold">
              {user?.displayName}
            </h2>
            <p className="flex flex-col justify-center items-center text-sm capitalize">
              <FaUniversity className="text-xl mb-3" /> {userInfo?.university}
            </p>
            <p className="flex flex-col justify-center items-center text-sm my-2 capitalize">
              <GoHome className="text-xl mb-3" /> {userInfo?.address}
            </p>
            <div className="card-actions justify-center">
              <button className="btn btn-secondary btn-sm flex justify-center items-center">
                <FiEdit className="mr-1 -mt-1" /> Edit Profile
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
};

export default Profile;
