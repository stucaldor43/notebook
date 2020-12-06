import React, { useState } from 'react';
import generateUUID from "../utils/generateUUID";

function arrayDifference(minuend, subtrahend) {
  if (!Array.isArray(minuend) || !Array.isArray(subtrahend)) return undefined;
  const difference = minuend.filter((minuendMember) => subtrahend.indexOf(minuendMember) < 0)
  return difference;
}

function useNoteStore(initialValue) {
  const [notes, setNotes] = useState(initialValue || []);


  const save = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  const load = async () => {
    const noteQuerySnapshot = await db.collection("users")
      .doc(JSON.parse(window.localStorage.getItem("user")).name)
      .collection("notes")
      .where("id", ">=", "0")
      .get();
    const notes = noteQuerySnapshot.docs.map((noteQueryDocSnapshot) => noteQueryDocSnapshot.data())
    setNotes(notes);
  }

  const loadNote = (noteToLoad) => {
    const isNotePresentOnClient = notes.filter((note) => note.id === noteToLoad.id).length > 0 ? true : false;

    const modifiedNotes = isNotePresentOnClient 
    ? notes.map((note) => note.id === noteToLoad.id ? noteToLoad : note) 
    : notes.concat([noteToLoad]);
    setNotes(modifiedNotes);
  }

  const addNote = (title, text, tags) => {
    const createdNote = {
      id: generateUUID(),
      title,
      dateCreated: firebase.firestore.Timestamp.fromDate(new Date())/* Number(new Date())*/,
      text: text || "",
      tags: Array.isArray(tags) ? tags : [tags],
      selected: false
    }
    const updatedNotes = notes.concat([createdNote]);
    setNotes(updatedNotes);

    db.collection("users")
      .doc(JSON.parse(window.localStorage.getItem("user")).name)
      .collection("notes")
      .doc(createdNote.id)
      .set(createdNote)
    // TODO add try catch block around db call that will remove note from ui if the add note operation failed
  }

  const editNote = (id, updatedFields) => {
    const outdatedNote = notes.filter((note) => note.id === id)[0]
    const editedNote = Object.assign({}, outdatedNote, updatedFields);
    if (editedNote.tags.length > 4) return; // TODO open snackbar
    
    setNotes(notes.map((note) => {
      return id === note.id ? editedNote : note
    }));

    db.collection("users")
      .doc(JSON.parse(window.localStorage.getItem("user")).name)
      .collection("notes")
      .doc(editedNote.id)
      .set(editedNote)


    save();
  }

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  }

  const selectNote = (id) => {
    const updatedNotes = notes.map((note) => {
      if (note.id !== id) return (note.selected) ? Object.assign({}, note, { selected: false }) : note;
      return Object.assign({}, note, { selected: true });
    });
    setNotes(updatedNotes);
  }

  const removeTagFromNotes = (tag) => {
    const modifiedNotes = notes.map((note) => {
      return note.tags.indexOf(tag) >= 0
        ? Object.assign({}, note, { tags: arrayDifference(note.tags, [tag]) })
        : note
    });
    setNotes(modifiedNotes);


  }

  const addTagToNotes = (noteIds, tag) => {
    const modifiedNotes = notes.map((note) => {
      return (noteIds.indexOf(note.id) >= 0)
        ? Object.assign({}, note, { tags: note.tags.concat([tag]) })
        : note;
    });
    setNotes(modifiedNotes);
  }

  return {
    notes,
    setNotes,
    addNote,
    deleteNote,
    editNote,
    selectNote,
    loadNote,
    removeTagFromNotes,
    addTagToNotes,
    save,
    load
  };
}

export default useNoteStore;