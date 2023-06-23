import React from "react";
import { FlexBetween } from "../style/CommonClasses";
import { BsSearch } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className={`${FlexBetween} py-2 px-3 shadow`}>
      {/* LEFT SIDE */}
      <div className={`${FlexBetween} px-4 py-2 border rounded-md`}>
        <BsSearch />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none flex-1 ps-3"
        />
      </div>
      {/* RIGHT SIDE */}
      <div className={`${FlexBetween} border rounded-full`}>
        <img
          className="w-10 h-10 rounded-full"
          src="https://cdn3d.iconscout.com/3d/premium/thumb/man-avatar-6299539-5187871.png"
          alt="Rounded avatar"
        />
      </div>
    </div>
  );
};

export default Navbar;
