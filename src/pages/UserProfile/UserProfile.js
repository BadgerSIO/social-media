import React, { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { AuthContext } from "../../context/AuthProvider";
import ProfileModal from "../../shared/ProfileModal/ProfileModal";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div>
        <div className="h-[200px]  border-b border-gray-700 bg-black"></div>
        <div className="flex justify-start  z-10 items-start p-5 space-x-5">
          <img
            src={user?.photoURL}
            className="w-28 h-28 rounded bg-gray-50 -mt-10"
            alt=""
          />
          <div>
            <h3 className="capitalize font-bold">{user?.displayName}</h3>
            <h6>Designation</h6>
          </div>
        </div>
        <p className="px-5 border-b  border-gray-700 pb-5 text-justify">
          <label
            htmlFor="profileModal"
            className="btn btn-secondary hover:bg-sky-500/20 flex items-center w-fit btn-sm"
          >
            <FaEdit className="mr-1" /> Add Bio
          </label>
        </p>
      </div>
      <ProfileModal />
    </>
  );
};

export default UserProfile;
