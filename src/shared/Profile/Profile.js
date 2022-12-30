import React, { useContext } from "react";
import { FaUniversity } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { AuthContext } from "../../context/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);

  console.log(user);
  return (
    <section>
      <div className="card w-full bg-base-100 shadow-xl border p-3 border-gray-700">
        <figure>
          <div className="avatar online">
            <div className="w-24  mask mask-squircle">
              <img src={user.photoURL} alt={user.displayName} />
            </div>
          </div>
        </figure>
        <div className="card-body text-center">
          <h2 className=" text-center">{user.displayName}</h2>
          <p>{/* <FaUniversity /> {} */}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-secondary flex justify-center items-center">
              <FiEdit className="mr-1 -mt-1" /> Edit Profile
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
