import React, { useContext, useEffect, useState } from 'react';
import Tagger from "./../components/Tagger.jsx";
import EditableTitle from '../components/EditableTitle.jsx';
import EditNoteView from '../components/EditNoteView.jsx';
import "./../../css/pages/NoteEditor/styles.css";
import TagArea from '../components/TagArea.jsx';
import notesAPI from "./../api/notes";
import tagsAPI from "./../api/tags";
import SnackBar from '../components/Snackbar';

function NoteEditor({ params: { id }, store }) {
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState([]);
  const [snackbarOptions, setSnackbarOptions] = useState({});
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const api = Object.assign({}, notesAPI(), tagsAPI());

  const addTag = async (tagToAdd) => {
    const noteTagCount = await api.findNote(id); // TODO is this right? shouldn't it include .tags.length somewhere?
    if (noteTagCount.length >= 4) return openSnackbar("You have reached the tag limit for this note. To add a tag to this note you must remove an existing tag first.");

    try {
      await api.updateNote(id, { tags: tags.concat([tagToAdd]) });
    }
    catch (e) {
      console.log(e);
      openSnackbar("Failed to add tag. Please try again later.");
      return;
    }

    try {
      api.createTag(tagToAdd);
    }
    catch (e) {
      console.log(e);
      openSnackbar("Failed to add tag. Please try again later.");
      await api.updateNote(id, { tags: tags.filter((tag) => tag !== tagToAdd) });
      return;
    }

    setTags(tags.concat([tagToAdd]));
  }

  const removeTag = async (tagToRemove) => {
    try {
      api.updateNote(id, { tags: tags.filter((tag) => tag !== tagToRemove) });
    }
    catch (e) {
      console.log(e);
      openSnackbar("Failed to remove tag. Please try again later.");
      return;
    }

    setTags(tags.filter((tag) => tag !== tagToRemove));
  }

  const openSnackbar = (text) => {
    setSnackbarOptions({ text, timeout: 5000, multiline: true })
    setIsSnackbarOpen(true);
  }

  const loadNote = async () => {
    const note = await api.findNote(id);

    setTitle(note.title);
    setText(note.text);
    setTags(note.tags);
    setIsLoading(false);
  }

  useEffect(() => {
    loadNote();
  }, []);

  useEffect(() => {
    loadNote();
  }, [id])

  return (
    <article className="page note">
      {
        isLoading
          ? null
          :
          <div className="container">
            <EditableTitle title={title} updateTitle={(e) => setTitle(e.target.value)} />
            <EditNoteView contents={text} updateContents={(e) => setText(e.target.textContent)} />
            <TagArea tags={tags} addTag={(tag) => addTag(tag)} removeTag={(tag) => removeTag(tag)} />
            <button onClick={() => api.updateNote(id, { title, text, tags })}>Save</button>
            <Tagger tags={tags}
              addTag={(tag) => addTag(tag)}
              removeTag={(tag) => removeTag(tag)} />
          </div>
      }
      {
        isSnackbarOpen &&
        <SnackBar options={snackbarOptions} close={() => setIsSnackbarOpen(false)} />
      }
    </article>
  )
}

export default NoteEditor;