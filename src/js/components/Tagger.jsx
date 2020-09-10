import React, { useState } from 'react';
import Button from './Button';
import Tag from './Tag';
import TagList from './TagList';

function Tagger({ tags, addTag }) {
  const [tagName, setTagName] = useState("");

  return (
    <div className="tagger">
      <div>
        <h2>TAGS</h2>
        <p>Press enter to add tag or click the Add button</p>
      </div>
      <div>
        <input type="text" value={tagName} onChange={(e) => setTagName(e.target.value)}/>
        <Button onClick={() => addTag(tagName)}>Add</Button>
      </div>
      <div>
        <TagList tags={tags} />
      </div>
    </div>
  )
}

export default Tagger;