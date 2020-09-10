import React, { useEffect, useState } from 'react';
import NoteContext from "./../context/note-context";
import Tagger from "./../components/Tagger.jsx";
import EditableTitle from '../components/EditableTitle.jsx';
import EditNoteView from '../components/EditNoteView.jsx';
import "./../../css/pages/NoteEditor/styles.css";
import TagArea from '../components/TagArea.jsx';

let note;

function NoteEditor({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    note = {
      id: 3,
      title: 'PHI 105',
      dateCreated: Number(new Date()),
      text: 'Finish homework for class on Monday',
      tags: ["Philosophy", "Running"],
      selected: false
    }
    setIsLoading(false);
    setTitle(note.title);
    setText(note.text);
    setTags(note.tags);
  }, [])

  return (
    <NoteContext.Consumer>
      {
        ({ editNote }) => {
          return (
            <article className="page note">
              {
                isLoading ?
                  null :
                  <div className="container">
                    <EditableTitle title={title} updateTitle={(e) => setTitle(e.target.value)} />
                    <EditNoteView contents={text} updateContents={(e) => setText(e.target.textContent)} />
                    <TagArea tags={tags} removeTag={(indexOfTagToDelete) => setTags(tags.filter((tag, index) => index !== indexOfTagToDelete))} />
                    <button onClick={() => editNote(note.id, { title, text, tags })}>Save</button>
                    <Tagger tags={tags} addTag={(tag) => setTags(tags.concat([tag]))}/>
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