import React from 'react';
import "./../../css/components/TitleWithOptionalButton/styles.css";

function TitleWithOptionalButton({title, button}) {
  return (
    <div className="title-with-optional-button">
      <h1 className="title-with-optional-button__title">{title}</h1>
      <div>
        {button || null}
      </div>
    </div>
  )
}

export default TitleWithOptionalButton;