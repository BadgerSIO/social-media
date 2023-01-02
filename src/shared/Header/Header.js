import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CgFeed } from "react-icons/cg";
import { BiHomeCircle, BiLogOutCircle } from "react-icons/bi";
import { TbMessages } from "react-icons/tb";
import { MdOutlineAccountCircle } from "react-icons/md";
import { AuthContext } from "../../context/AuthProvider";
const Header = () => {
  const { user, logout } = useContext(AuthContext);
  let activeNow =
    "text-lg p-2 rounded bg-secondary flex justify-center lg:justify-start items-center space-x-3 text-primary font-semibold";
  let notActive =
    "text-lg p-2 rounded hover:bg-secondary flex justify-center lg:justify-start items-center space-x-3 font-semibold";
  return (
    <nav className="sticky top-0">
      <ul className="space-y-2">
        <li className="text-lg  p-2 rounded hover:bg-secondary">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? activeNow : notActive)}
          >
            <BiHomeCircle className="text-2xl" />
            <span className="hidden lg:block">Home</span>
          </NavLink>
        </li>
        <li className="text-lg  p-2 rounded hover:bg-secondary">
          <NavLink
            to="/media"
            end
            className={({ isActive }) => (isActive ? activeNow : notActive)}
          >
            <CgFeed className="text-2xl" />
            <span className="hidden lg:block">Media</span>
          </NavLink>
        </li>
        <li className="text-lg  p-2 rounded hover:bg-secondary">
          <NavLink
            to="/messages"
            end
            className={({ isActive }) => (isActive ? activeNow : notActive)}
          >
            <TbMessages className="text-2xl" />{" "}
            <span className="hidden lg:block">Message</span>
          </NavLink>
        </li>
        <li className="text-lg  p-2 rounded hover:bg-secondary">
          {user ? (
            <NavLink
              to="/profile"
              end
              className={({ isActive }) => (isActive ? activeNow : notActive)}
            >
              <MdOutlineAccountCircle className="text-2xl" />
              <span className="hidden lg:block">Account</span>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              end
              className={({ isActive }) => (isActive ? activeNow : notActive)}
            >
              <MdOutlineAccountCircle className="text-2xl" />
              <span className="hidden lg:block">Login</span>
            </NavLink>
          )}
        </li>
        {user?.uid ? (
          <li className="">
            <button
              onClick={logout}
              className="btn btn-secondary flex items-center p-2 w-full group"
            >
              <BiLogOutCircle className="text-2xl mr-3 group-hover:mr-4" />
              <span className="hidden lg:block">Logout</span>
            </button>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </nav>
  );
};

export default Header;
