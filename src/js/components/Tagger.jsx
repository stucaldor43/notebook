import React, { useEffect, useState, useContext } from 'react';
import Button from './Button';
import tagsAPI from "./../api/tags";
import AuthContext from '../context/auth-context';

function Tagger({ tags, addTag, removeTag }) {
  const { user } = useContext(AuthContext)
  const [tagName, setTagName] = useState("");
  const [allPossibleNoteTagsList, setAllPossibleNoteTagsList] = useState([]);

  const fetchAllTags = async () => {
    setAllPossibleNoteTagsList(await tagsAPI(user).fetchTags());
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
        <input type="text" value={tagName} onChange={(e) => setTagName(e.target.value)} />
        <Button onClick={() => addTag(tagName)}>Add</Button>
      </div>
      <div>
        {
          allPossibleNoteTagsList.map((selectableTag) => {
            return (
              <label><input checked={tags.indexOf(selectableTag) >= 0 ? true : false} type="checkbox" onChange={(e) => e.target.checked ? addTag(selectableTag) : removeTag(selectableTag)} />{selectableTag}</label>);
          })
        }
      </div>
    </div>
  )
}

export default Tagger;