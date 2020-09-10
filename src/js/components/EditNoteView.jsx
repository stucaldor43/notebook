import React, {useEffect} from 'react';
import "./../../css/components/EditNoteView/styles.css";

let node;

function EditNoteView({contents, updateContents}) {
  useEffect(() => {
    node.textContent = contents;
  }, [])
  
  return (
    <div>
        <div contentEditable="true" 
             className="edit-note-view__contentEditor"
             ref={(element) => node = element}
             onKeyDown={updateContents}></div>
      </div>
  );
}

export default EditNoteView;