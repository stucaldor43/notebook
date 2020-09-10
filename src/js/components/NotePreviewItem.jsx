import React from 'react';
import "./../../css/components/NotePreviewItem/styles.css";

function NotePreviewItem({item, selectNote}) {
  const selectNoteForEditingThenRedirect = (id) => {
    selectNote(id);
    location.assign(`/#/note/${id}`);
  }

  return (
  <li tabIndex="0" onKeyPress={(e) => e.key === "Enter" && selectNoteForEditingThenRedirect(item.id)} onClick={() => selectNoteForEditingThenRedirect(item.id)} className="note-preview-item">
    <h2 className="note-preview-item__title">{item.title}</h2>
    <p className="note-preview-item__textContent">{item.text.substring(0, 401)}</p>
  </li>
  );
}

export default NotePreviewItem;