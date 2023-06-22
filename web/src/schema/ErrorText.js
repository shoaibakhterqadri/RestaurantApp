import React from "react";

const ErrorText = ({ touched, error }) => {
    return (
      <>
        {touched && error ? (
          <span className="col-12 ps-0 pe-4 text-start text-danger">{error}</span>
        ) : null}
      </>
    );
  };

export default ErrorText;