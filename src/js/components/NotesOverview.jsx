import React, { useState } from 'react';
import TitleWithOptionalButton from "./TitleWithOptionalButton.jsx";
import Button from "./Button.jsx";
import NotePreviewList from "./NotePreviewList.jsx";
import TagSvg from './TagSvg.jsx';
import AddNoteDialog from "./AddNoteDialog.jsx";
import TagManager from './TagManager.jsx';

function NotesOverview({ store }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTagManagerOpen, setIsTagManagerOpen] = useState(false);

  return (
    <div>
      <TitleWithOptionalButton
        title="Notes">
        <Button classes="title-with-optional-button__button"
          onClick={() => setIsDialogOpen(true)}>
          Add Note
            </Button>
        <Button classes="title-with-optional-button__button"
          onClick={() => setIsTagManagerOpen(true)}
          testid="open-tag-manager-button">
          <TagSvg />
        </Button>
      </TitleWithOptionalButton>
      <NotePreviewList notes={store.notes} selectNote={store.selectNote}/>
      { isDialogOpen && <AddNoteDialog closeDialog={() => setIsDialogOpen(false)} />}
      { isTagManagerOpen && <TagManager onClose={() => setIsTagManagerOpen(false)} />}
    </div>
  );
}

export default NotesOverview;