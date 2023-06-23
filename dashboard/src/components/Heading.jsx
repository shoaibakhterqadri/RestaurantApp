import React from "react";

const Heading = ({ children }) => {
  return (
    <div className="text-xl font-semibold md:text-3xl font-serif text-indigo-600 mb-4">
      {children || "TEXT"}
    </div>
  );
};

export default Heading;
