import React, { useEffect, useRef } from "react";
import "./../../css/components/Snackbar/styles.css";

function SnackBar({ options, close }) {
  let timeoutID = useRef(null);
  let prevOptions = useRef(null);
  
  const text = options.text || "";
  const timeout = typeof options.timeout === "number" ? options.timeout : 5000;
  const multiline = !!options.multiline;

  useEffect(() => {
    if (prevOptions.current === null || options !== prevOptions.currrent) {
      if (options !== prevOptions.currrent) clearTimeout(timeoutID.current);
      timeoutID.current = setTimeout(() => {
        close();
      }, timeout)
      prevOptions.current = options;
    }

    return () => clearTimeout(timeoutID.current);
  });

  return (
    <div className="snackbar" data-testid="snackbar">
      <p className="snackbar__text" style={{ height: multiline ? "50px" : "25px" }}>{text}</p>
      <div>
        <button className="snackbar__button" onClick={close}>Close</button>
      </div>
    </div>
  )
}

export default SnackBar;