import React from 'react';
import NotePreviewItem from "./../components/NotePreviewItem";
import "./../../css/components/NotePreviewList/styles.css";
import NoteContext from "./../context/note-context";

function NotePreviewList() {
  return (
    <NoteContext.Consumer>
      {
        ({ notes, selectNote }) => {
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
      }
    </NoteContext.Consumer>
  );
}

export default NotePreviewList;