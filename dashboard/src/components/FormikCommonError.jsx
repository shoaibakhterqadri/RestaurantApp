import React from "react";

const FormikCommonError = ({ name, touched, error }) => {
  return (
    <>
      {name && touched ? (
        <div className="text-red-600 my-1">{error}</div>
      ) : null}
    </>
  );
};

export default FormikCommonError;
