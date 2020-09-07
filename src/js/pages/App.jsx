import React, { useEffect } from "react";
import useNoteStore from "../stores/useNoteStore.jsx";
import NoteContext from "./../context/note-context";

const mockData = [{
  id: 1, 
  title: 'Gym Schedule',
  dateCreated: Number(new Date()),
  text: 'Before premiere on Tuesday, buy a dress',
  tag: "Clothing",
  selected: false
}, {
  id: 2, 
  title: 'Exercise Goals',
  dateCreated: Number(new Date()),
  text: 'Run 2 miles every morning next week',
  tag: "Exercise",
  selected: false
},{
  id: 3, 
  title: 'PHI 105',
  dateCreated: Number(new Date()),
  text: 'Finish homework for class on Monday',
  tag: "Philosophy",
  selected: false
}];

function App({child}) {
  const {notes, setNotes, addNote, editNote, deleteNote, selectNote, save, load} = useNoteStore(mockData);
  
  useEffect(() => {
    // load data from database
  }, []);
  
  return(
    <NoteContext.Provider value={{notes, setNotes, addNote, editNote, deleteNote, selectNote, save, load}}> 
      {child}
    </NoteContext.Provider>
  );
}

export default App;