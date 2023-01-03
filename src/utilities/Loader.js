import React from "react";
import { BounceLoader } from "react-spinners";

const Loader = ({ isLoading }) => {
  return (
    <div className="fixed bg-black z-50 top-0 left-0 h-screen flex justify-center items-center w-screen">
      <BounceLoader size={50} color={"rgb(14 165 233)"} />
    </div>
  );
};

export default Loader;
