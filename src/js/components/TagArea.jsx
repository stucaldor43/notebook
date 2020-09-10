import React from 'react';
import TagList from './TagList';

function TagArea({tags, removeTag}) {
  return (
    <div>
      <h2>Tags:</h2>
      <TagList tags={tags} removeTag={removeTag}/>
    </div>
  )
}

export default TagArea;