import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../shared/Header/Header";
import Profile from "../../shared/Profile/Profile";

const Main = () => {
  return (
    <div>
      <div className="lg:w-[1100px] grid grid-cols-8 lg:grid-cols-4  min-h-screen mx-auto ">
        <div className="col-span-1 lg:col-span-1 p-1 md:p-2 lg:p-5  ">
          <Header />
        </div>
        <div className="col-span-5 lg:col-span-2  border-r border-l border-gray-700 ">
          <Outlet />
        </div>
        <div className="col-span-2 lg:col-span-1 p-1 md:p-2 lg:p-5">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Main;
