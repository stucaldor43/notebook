import React from 'react';
import NotePreviewItem from "./../components/NotePreviewItem";
import "./../../css/components/NotePreviewList/styles.css";

function NotePreviewList({ notes, selectNote }) {
  return (
    <div className="note-preview-list">
      {
        notes.map((note) => {
          return (
            <NotePreviewItem key={note.id}
              item={note}
              selectNote={selectNote} />
          );
        })
      }
    </div>
  )
}

export default NotePreviewList;