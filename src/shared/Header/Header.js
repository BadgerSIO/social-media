import React from "react";
import { NavLink } from "react-router-dom";
import { CgFeed } from "react-icons/cg";
import { BiHomeCircle } from "react-icons/bi";
import { TbMessages } from "react-icons/tb";
const Header = () => {
  let activeNow =
    "text-lg p-2 rounded bg-secondary flex justify-center lg:justify-start items-center space-x-3 text-primary font-semibold";
  let notActive =
    "text-lg p-2 rounded hover:bg-secondary flex justify-center lg:justify-start items-center space-x-3 font-semibold";
  return (
    <nav>
      <h1 className="text-2xl capitalize font-semibold mb-5">Social Media</h1>
      <ul className="space-y-2">
        <li className="text-lg  p-2 rounded hover:bg-secondary">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? activeNow : notActive)}
          >
            <BiHomeCircle className="text-2xl" />{" "}
            <span className="hidden lg:block">Home</span>
          </NavLink>
        </li>
        <li className="text-lg  p-2 rounded hover:bg-secondary">
          <NavLink
            to="/media"
            end
            className={({ isActive }) => (isActive ? activeNow : notActive)}
          >
            <CgFeed className="text-2xl" />{" "}
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
      </ul>
    </nav>
  );
};

export default Header;
