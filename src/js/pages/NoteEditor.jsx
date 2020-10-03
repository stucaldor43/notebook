import React, { useContext, useEffect, useState } from 'react';
import NoteContext from "./../context/note-context";
import Tagger from "./../components/Tagger.jsx";
import EditableTitle from '../components/EditableTitle.jsx';
import EditNoteView from '../components/EditNoteView.jsx';
import "./../../css/pages/NoteEditor/styles.css";
import TagArea from '../components/TagArea.jsx';
import AuthContext from '../context/auth-context';
import notesAPI from "./../api/notes";
import tagsAPI from "./../api/tags";

let note;

function NoteEditor({ params: { id } }) {
  const { user, isSignedIn } = useContext(AuthContext);
  const { editNote, loadNote: updateNote, selectNote, notes } = useContext(NoteContext);
  
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  const api = Object.assign({}, notesAPI(), tagsAPI());

  const addTag = async (tagToAdd) => {
    const selectedNotes = notes.filter((note) => note.selected);
    console.assert(selectedNotes.length === 1, { notes: selectedNotes, errorMsg: "Multiple notes have a selected property that is true" })
    const noteTagCount = await api.findNote(currentNote.id);
    if (noteTagCount.length >= 4) return alert("You have reached the tag limit for this note. To add a tag to this note you must remove an existing tag first.");

    try {
      await api.updateNote(currentNote.id, { tags: currentNote.tags.concat([tagToAdd]) });
    }
    catch(e) {
      console.log(e);
      return alert("Failed to add tag. Please try again later.");
    }

    try {
      api.createTag(tagToAdd);
    }
    catch(e) {
      console.log(e);
      await api.updateNote(currentNote.id, { tags: currentNote.tags.filter((tag) => tag !== tagToAdd) });
      return alert("Failed to add tag. Please try again later.");
    }

    editNote(currentNote.id, { tags: currentNote.tags.concat([tagToAdd]) });
  }

  const removeTag = async (tagToRemove) => {
    try {
      api.updateNote(currentNote.id, { tags: currentNote.tags.filter((tag) => tag !== tagToRemove) });
    }
    catch(e) {
      console.log(e);
      return alert("Failed to remove tag. Please try again later.");
    }

    editNote(currentNote.id, { tags: currentNote.tags.filter((tag) => tag !== tagToRemove) });
  }

  const loadNote = async () => {
    const note = await api.findNote(id);
    updateNote(note);
    selectNote(note.id);
  }

  useEffect(() => {
    if (isSignedIn && isLoading) loadNote();
  }, [])

  useEffect(() => {
    if (isSignedIn && isLoading) loadNote();
  }, [isSignedIn])

  useEffect(() => {
    const selectedNotes = notes.filter((note) => note.selected);
    if (selectedNotes.length <= 0) return;

    const note = selectedNotes[0];
    setCurrentNote(note);
    if (isLoading) {
      setTitle(note.title);
      setText(note.text);
      setTags(note.tags);
      setIsLoading(false);
    }
    setTitle(note.title);
    setText(note.text);
    setTags(note.tags);

  }, [notes])

  return (
    <NoteContext.Consumer>
      {
        ({ editNote }) => {
          return (
            <article className="page note">
              {
                isLoading || currentNote === null ?
                  null :
                  <div className="container">
                    <EditableTitle title={title} updateTitle={(e) => setTitle(e.target.value)} />
                    <EditNoteView contents={text} updateContents={(e) => setText(e.target.textContent)} />
                    <TagArea tags={tags} addTag={(tag) => addTag(tag)} removeTag={(tag) => removeTag(tag)} />
                    <button onClick={() => editNote(notes.find((note) => note.selected).id, { title, text, tags })}>Save</button>
                    <Tagger tags={currentNote.tags} 
                      addTag={(tag) => addTag(tag)} 
                      removeTag={(tag) => removeTag(tag)}/>
                  </div>
              }
            </article>
          )
        }
      }
    </NoteContext.Consumer>
  );
}

export default NoteEditor;