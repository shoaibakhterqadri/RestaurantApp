import React from "react";
import { Navigate } from "react-router-dom";

const protectedRoutes = ({ isSignedIn, children }) => {
  console.log("isSignedIn", isSignedIn);
  if (!isSignedIn) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export default protectedRoutes;
