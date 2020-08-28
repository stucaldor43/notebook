import React, { useState } from 'react';
import {deleteNote} from '../api/notes';
import generateUUID from "../utils/generateUUID";

function useNoteStore(initialValue) {
  const [notes, setNotes] = useState(initialValue || []);

  const addNote = (title, text, tag) => {
    const updatedNotes = notes.concat([{
      id: generateUUID(), 
      title,
      dateCreated: Number(new Date()),
      text,
      tag,
      selected: false
    }]);
    setNotes(updatedNotes);
  }
  
  const editNote = (id, updatedFields) => {
    setNotes(notes.map((note) => {
      id === note.id ? Object.assign({}, note, updatedFields): note
    }))
  }

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  }

  const selectNote = (id) => {
    const updatedNotes = notes.map((note) => {
      if (note.id !== id) return (note.selected) ? Object.assign({}, note, {selected: false}) : note;
      return Object.assign({}, note, {selected: true});
    });
    setNotes(updatedNotes);
  }

  const save = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  const load = () => {
    setNotes(JSON.parse(localStorage.getItem('notes')));
  }

  return {notes, setNotes, addNote, deleteNote, editNote, selectNote, save, load};
}

export default useNoteStore;