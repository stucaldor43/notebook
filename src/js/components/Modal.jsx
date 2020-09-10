import React from 'react';
import "./../../css/components/Modal/styles.css";

function Modal({ classes, children }) {
  return (
    <div className={`modal ${classes ? classes : ''}`}>
      {children}
    </div>
  );
}

export default Modal;