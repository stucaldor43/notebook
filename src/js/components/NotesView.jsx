import React from 'react';
import TitleWithOptionalButton from "./TitleWithOptionalButton.jsx";
import Button from "./Button.jsx";
import NotePreviewList from "./NotePreviewList.jsx";

function NotesView() {
  return (
    <div>
      <TitleWithOptionalButton title="Notes" button={<Button classes="title-with-optional-button__button">Add Notes</Button>}></TitleWithOptionalButton>
      <NotePreviewList/>
    </div>
  );
}

export default NotesView;