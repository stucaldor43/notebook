import React from 'react';
import "./../../css/components/Tag/styles.css";
import CrossSvg from './../components/CrossSvg.jsx';
import LoadingSvg from './../components/LoadingSvg.jsx';
import Button from './Button';

function Tag({ name, deleteTag, removeable = true, loading = false }) {
  return (
    <li className="tag">
      {loading &&
        <LoadingSvg classes={"tag__loadingIndicator"} />
      }
      <span className="tag__name">{name}</span>
      {removeable &&
        <Button onClick={deleteTag} classes="tag__deleteButton" testid={`delete-${name}-tag-button`}>
          <CrossSvg classes={"tag__icon"} tabbable={true} />
        </Button>
      }
    </li>
  );
}

export default Tag;