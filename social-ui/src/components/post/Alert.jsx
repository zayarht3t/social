import React, { Fragment } from "react";
import { useAlert } from "react-alert";

function Alert() {
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
}

export default Alert