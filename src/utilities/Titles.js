import React from "react";

const Titles = ({ children }) => {
  return (
    <h1 className="text-gray-200 text-xl font-semibold sticky top-0 p-5">
      {children}
    </h1>
  );
};

export default Titles;
