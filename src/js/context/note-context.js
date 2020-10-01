import React from 'react';

const NoteContext = React.createContext({
  notes: [], 
  setNotes: () => {}, 
  addNote: (title, text, tags) => {}, 
  editNote: (id, updatedNote) => {}, 
  deleteNote: (id) => {},
  selectNote: (id) => {},
  loadNote: (note) => {},
  removeTagFromNotes: (tag) => {},
  addTagToNotes: (noteIds, tag) => {},
  save: () => {}, 
  load: () => {}
});

export default NoteContext;