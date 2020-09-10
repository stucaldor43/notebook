import React from 'react';
import Tag from "./Tag.jsx";
import "./../../css/components/TagList/styles.css";

function TagList({tags, removeTag}) {
  return (
    <ul className="tag-list">
      {tags.map((tag, i) => <Tag name={tag} deleteTag={() => removeTag(i)}></Tag>)}
    </ul>
  );
}

export default TagList;