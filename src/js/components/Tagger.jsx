import React, { useEffect, useState } from 'react';
import Button from './Button';
import tagsAPI from "./../api/tags";

function Tagger({ tags, addTag, removeTag }) {
  const [tagName, setTagName] = useState("");
  const [allPossibleNoteTagsList, setAllPossibleNoteTagsList] = useState([]);
  
  const api = tagsAPI();

  const fetchAllTags = async () => {
    setAllPossibleNoteTagsList(await api.fetchTags());
    console.log('data fetched');
  }

  useEffect(() => {
    fetchAllTags();
  }, []);

  return (
    <div className="tagger">
      <div>
        <h2>TAGS</h2>
        <p>Press enter to add tag or click the Add button</p>
      </div>
      <div>
        <input placeholder="enter tag name" type="text" value={tagName} onChange={(e) => setTagName(e.target.value)} />
        <Button onClick={() => {
          addTag(tagName); // TODO put all code in this handler in try catch block (?)
          setAllPossibleNoteTagsList(allPossibleNoteTagsList.concat([tagName]))
          setTagName(""); // TODO SETALLPOSS EQUAL TO ALLPOSS.CONCAT TAGNAME BEFORE MAKING TAG NAME BLANK
        }}>Add</Button>
      </div>
      <div>
        {
          allPossibleNoteTagsList.map((selectableTag) => {
            return (
              <label key={selectableTag}><input checked={tags.indexOf(selectableTag) >= 0 ? true : false} type="checkbox" onChange={(e) => e.target.checked ? addTag(selectableTag) : removeTag(selectableTag)} />{selectableTag}</label>);
          })
        }
      </div>
    </div>
  )
}

export default Tagger;