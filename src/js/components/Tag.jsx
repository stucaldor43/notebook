import React from 'react';
import "./../../css/components/Tag/styles.css";
import CrossSvg from './../components/CrossSvg.jsx';
import LoadingSvg from './../components/LoadingSvg.jsx';

function Tag({ name, deleteTag, removeable = true, loading = false }) {
  return (
    <li className="tag">
      {loading &&
        <LoadingSvg classes={"tag__loadingIndicator"} />
      }
      <span className="tag__name">{name}</span>
      {removeable &&
        <CrossSvg classes={"tag__icon"} onClick={deleteTag} tabbable={true} />
      }
    </li>
  );
}

export default Tag;