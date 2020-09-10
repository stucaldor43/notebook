import React, { useState, useEffect } from 'react';
import Modal from "./Modal.jsx";
import Button from "./Button.jsx";
import NoteContext from "./../context/note-context";
import "./../../css/components/AddNoteDialog/styles.css";

let dialogElement;

function addNoteDialog({ isOpen, closeDialog }) {
  const [title, setTitle] = useState("");
  
  const handleClick = (e) => {
    if (dialogElement && !dialogElement.contains(e.target)) {
      setTitle("");
      closeDialog();
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleClick);

    return function cleanupListeners() {
      document.body.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <NoteContext.Consumer>
      {
        ({ addNote }) => {
          return (
            <Modal classes={`${isOpen ? "add-note-dialog--visible" : "add-note-dialog--invisible"} add-note-dialog`}>
              <div ref={(el) => dialogElement = el} className="add-note-dialog__container">
                <div className="add-note-dialog_header">
                  <h2 className="add-note-dialog__title">Add Note</h2>
                </div>
                <div className="add-note-dialog__content">
                  <input className="add-note-dialog__input" placeholder="Title of note" onChange={(e) => setTitle(e.target.value)} value={title}/>
                </div>
                <div className="add-note-dialog__footer">
                  <Button onClick={closeDialog} classes="add-note-dialog__button add-note-dialog_button--cancel">Cancel</Button>
                  <Button onClick={() => { addNote(title, "", ""); setTitle(""); closeDialog() }} classes="add-note-dialog__button add-note-dialog_button--create">Create</Button>
                </div>
              </div>
            </Modal>
          );
        }
      }
    </NoteContext.Consumer>
  );
}

export default addNoteDialog;