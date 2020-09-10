import React from 'react';
import TitleWithOptionalButton from "./TitleWithOptionalButton.jsx";
import Button from "./Button.jsx";
import NotePreviewList from "./NotePreviewList.jsx";

function NotesOverview({openDialog}) {
  return (
    <div>
      <TitleWithOptionalButton title="Notes" button={<Button classes="title-with-optional-button__button" onClick={openDialog}>Add Note</Button>}></TitleWithOptionalButton>
      <NotePreviewList/>
    </div>
  );
}

export default NotesOverview;