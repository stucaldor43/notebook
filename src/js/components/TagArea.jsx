import React, { useState, useContext } from 'react';
import TagList from './TagList';

function TagArea({tags, removeTag, addTag}) {
  const [tagName, setTagName] = useState("");
  
  return (
    <div>
      <h2>Tags:</h2>
      <TagList tags={tags} removeTag={removeTag}/>
      <div>
        <input type="text" 
        value={tagName}
        placeholder="Add tag" 
        onKeyPress={(e) => {
          if (e.key === "Enter") { 
            addTag(tagName);
            setTagName("")
          }
        }}
        onChange={(e) => setTagName(e.target.value)}/></div>
    </div>
  )
}

export default TagArea;