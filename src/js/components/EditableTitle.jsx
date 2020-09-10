import React from 'react';
import "./../../css/components/EditableTitle/styles.css";

function EditableTitle({title, updateTitle}) {
  return (
    <div className="editable-title">
        <input type="text" className="editable-title__input" value={title} onChange={updateTitle}/>
    </div>
  );
}

export default EditableTitle;