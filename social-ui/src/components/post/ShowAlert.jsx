import React, { Fragment } from "react";
import { useAlert } from "react-alert";

export default function ShowAlert() {
  const alert = useAlert();

  return (
    <Fragment>
      
      <button
        onClick={() => {
          alert.success("Deleted successfully!");
        }}
      >
        Success!
      </button>
    </Fragment>
  );
};

