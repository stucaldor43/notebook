import React from 'react';
import "./../../css/components/Tag/styles.css";
import CrossSvg from './../components/CrossSvg.jsx';

function Tag({name, deleteTag}) {
  return (
    <li className="tag">
      <span className="tag__name">{name}</span>
      <CrossSvg classes={"tag__icon"} onClick={deleteTag} tabbable={true}/>
    </li>
  );
}

export default Tag;