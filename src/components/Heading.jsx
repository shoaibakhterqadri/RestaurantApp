import React from "react";
import Line from "../assets/image/line.png";

const Heading = ({ children }) => {
  return (
    <h1 className="font-[Poppins] sm:text-4xl mb-4 font-medium text-white w-[92%] mx-auto mt-10 justify-center items-center flex flex-col gap-3">
      <span className="text-[48px]">{children || ""}</span>
      <img src={Line} alt="" className="bg-white" />
    </h1>
  );
};

export default Heading;
