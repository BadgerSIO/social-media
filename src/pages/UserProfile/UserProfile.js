import { useQuery } from "@tanstack/react-query";
import axios from "../../axios";
import React, { useContext, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AuthContext } from "../../context/AuthProvider";
import ProfileModal from "../../shared/ProfileModal/ProfileModal";
import Loader from "../../utilities/Loader";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [current, setCurrent] = useState();
  const {
    data: userInfo,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userinfo", "email", user],
    queryFn: async () => {
      const { data } = await axios.get(`/userinfo?email=${user?.email}`);
      return data;
    },
  });
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div>
        <div className="h-[200px]  border-b border-gray-700 bg-black"></div>
        <div className="flex justify-start  z-10 items-start p-5 space-x-5">
          <img
            src={user?.photoURL}
            className="w-24 h-24 lg:w-28 lg:h-28 rounded bg-gray-50 -mt-10"
            alt={user?.displayName}
            onError={(e) =>
              (e.target.src = "https://i.ibb.co/1KLYTtF/profilepic.webp")
            }
          />
          {/* Add designation  */}
          <div>
            <h3 className="capitalize font-bold">{user?.displayName}</h3>
            {userInfo?.designation ? (
              <h6 className="flex text-xs md:text-sm lg:text-base">
                {userInfo.designation}
                <label
                  htmlFor="profileModal"
                  onClick={() => setCurrent("designation")}
                  className="ml-2 cursor-pointer"
                >
                  <FaEdit className="mr-1" />
                </label>
              </h6>
            ) : (
              <label
                htmlFor="profileModal"
                onClick={() => setCurrent("designation")}
                className="btn btn-secondary hover:bg-sky-500/20 flex items-center w-fit btn-sm"
              >
                <FaEdit className="mr-1" /> Add Designation
              </label>
            )}
          </div>
        </div>
        {/* Add bio  */}
        <div className="px-5 border-y  border-gray-700 py-5 ">
          {userInfo?.bio ? (
            <p className="relative text-sm lg:text-base text-gray-300">
              <label
                htmlFor="profileModal"
                onClick={() => setCurrent("bio")}
                className="cursor-pointer absolute right-0 -top-1"
              >
                <FaEdit className="mr-1" />
              </label>
              <span className="block font-bold capitalize text-sky-500">
                Bio
              </span>
              {userInfo.bio}
            </p>
          ) : (
            <label
              htmlFor="profileModal"
              onClick={() => setCurrent("bio")}
              className="btn btn-secondary hover:bg-sky-500/20 flex items-center w-fit btn-sm"
            >
              <FaEdit className="mr-1" /> Add bio
            </label>
          )}
        </div>
        {/* Add university  */}
        <div className="p-5 border-b  border-gray-700 pb-5 text-justify">
          {userInfo?.university ? (
            <h6 className="relative capitalize text-gray-300">
              <label
                htmlFor="profileModal"
                onClick={() => setCurrent("university")}
                className="cursor-pointer absolute right-0 top-0"
              >
                <FaEdit className="mr-1" />
              </label>
              <span className="block font-bold text-sky-500">university</span>
              {userInfo.university}
            </h6>
          ) : (
            <label
              htmlFor="profileModal"
              onClick={() => setCurrent("university")}
              className="btn btn-secondary hover:bg-sky-500/20 flex items-center w-fit btn-sm"
            >
              <FaEdit className="mr-1" /> Add university
            </label>
          )}
        </div>
        {/* Add address  */}
        <div className="p-5 border-b  border-gray-700 pb-5 text-justify">
          {userInfo?.address ? (
            <h6 className="relative capitalize text-gray-300">
              <label
                htmlFor="profileModal"
                onClick={() => setCurrent("address")}
                className="cursor-pointer absolute right-0 top-0"
              >
                <FaEdit className="mr-1" />
              </label>
              <span className="block font-bold text-sky-500 ">address</span>
              {userInfo.address}
            </h6>
          ) : (
            <label
              htmlFor="profileModal"
              onClick={() => setCurrent("address")}
              className="btn btn-secondary hover:bg-sky-500/20 flex items-center w-fit btn-sm"
            >
              <FaEdit className="mr-1" /> Add address
            </label>
          )}
        </div>
      </div>
      {current && (
        <ProfileModal
          current={current}
          setCurrent={setCurrent}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default UserProfile;
