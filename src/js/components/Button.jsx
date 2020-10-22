import React from 'react';
import "./../../css/components/Button/styles.css";

function Button({children, onClick = () => {}, classes, testid}) {
  return (<button data-testid={testid} className={`${classes ? classes : ""}`} onClick={onClick}>{children}</button>)
}

export default Button;