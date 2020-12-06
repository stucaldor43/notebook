import React, { useState, useEffect } from 'react';
import Modal from "./Modal.jsx";
import Button from "./Button.jsx";
import "./../../css/components/AddNoteDialog/styles.css";
import notesAPI from "./../api/notes";
import generateUUID from '../utils/generateUUID.js';

let dialogElement;

function AddNoteDialog({ closeDialog }) {
  const [title, setTitle] = useState("");
  
  const handleClick = (e) => {
    if (dialogElement && !dialogElement.contains(e.target)) {
      setTitle("");
      closeDialog();
    }
  };

  const addNote = async (title, text, tags) => {
    const note = {
      id: generateUUID(),
      title,
      dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
      text: text || "",
      tags: Array.isArray(tags) ? tags : [tags],
      selected: false
    };
    await notesAPI().createNote(note);
    return note;
  }

  useEffect(() => {
    document.body.addEventListener("click", handleClick);

    return function cleanupListeners() {
      document.body.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <Modal classes="add-note-dialog">
      <div ref={(el) => dialogElement = el} className="add-note-dialog__container">
        <div className="add-note-dialog_header">
          <h2 className="add-note-dialog__title">Add Note</h2>
        </div>
        <div className="add-note-dialog__content">
          <input className="add-note-dialog__input" placeholder="Title of note" onChange={(e) => setTitle(e.target.value)} value={title}/>
        </div>
        <div className="add-note-dialog__footer">
          <Button onClick={closeDialog} classes="add-note-dialog__button add-note-dialog_button--cancel">Cancel</Button>
          <Button onClick={async () => { 
            const note = await addNote(title, "", []); 
            setTitle(""); 
            closeDialog();
            location.assign(`/#/note/${note.id}`)
           }} 
            classes="add-note-dialog__button add-note-dialog_button--create">
              Create
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AddNoteDialog;