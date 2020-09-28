import React from 'react';
import "./../../css/components/TitleWithOptionalButton/styles.css";

function TitleWithOptionalButton({ children, title }) {
  return (
    <div className="title-with-optional-button">
      <div className="title-with-optional-button__row">
        <h1 className="title-with-optional-button__title">{title}</h1>
        <div className="title-with-optional-button__elementsContainer">
          {children}
        </div>
      </div>
    </div>
  )
}

export default TitleWithOptionalButton;