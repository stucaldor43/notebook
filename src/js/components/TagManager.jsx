import React, { useEffect, useContext, useState } from 'react';
import AuthContext from "./../context/auth-context";
import TagList from './TagList';
import tagsAPI from "./../api/tags";
import NoteContext from '../context/note-context';
import Modal from './Modal';
import "./../../css/components/TagManager/styles.css";

let tagManagerElement;

function TagManager({ onClose }) {
  const { user, isSignedIn } = useContext(AuthContext);
  const { removeTagFromNotes, addTagToNotes, notes } = useContext(NoteContext);
  const [tags, setTags] = useState([]);
  const [tagsLoaded, setTagsLoaded] = useState(false);
  const [newTagName, setNewTagName] = useState("");

  const api = tagsAPI(user);

  const addTag = async (tagToAdd) => {
    const tagExists = typeof (await api.findTagByName(tagToAdd)) !== "undefined" ? true : false;
    if (tagExists) return alert("A tag with that name already exists.")
    const presentTags = await api.fetchTags();
    if (presentTags.length >= 50) return alert("You have reached the tag limit. To create more tags you should delete some of your existing tags.");

    try {
      setTags(tags.concat([tagToAdd]));
      setNewTagName("");
      api.createTag(tagToAdd);
    }
    catch (error) {
      setTags(tags.filter(tag => tag !== tagToAdd));
    }
  }

  const removeTag = async (tagToRemove) => {
    const notesWithTag = notes
      .filter((note) => note.tags.indexOf(tagToRemove) >= 0)
      .map((note) => note.id);

    try {
      setTags(tags.filter(tag => tag !== tagToRemove));
      removeTagFromNotes(tagToRemove); // TODO use setnotes from context to remove tags from notes
      await api.deleteTag(tagToRemove);
    }
    catch (error) {
      setTags(tags.concat([tagToRemove]));
      addTagToNotes(notesWithTag, tagToRemove); // TODO use setnotes from context to add tags to notes
    }
  }

  useEffect(() => {
    const clickHandler = (e) => {
      if (tagManagerElement && !tagManagerElement.contains(e.target)) onClose()
    }
    document.body.addEventListener("click", clickHandler);

    return function cleanupListeners() {
      document.body.removeEventListener("click", clickHandler);
    }
  }, []);

  useEffect(() => {
    const loadTags = async () => {
      setTags(await api.fetchTags());
    }

    if (!tagsLoaded && isSignedIn) { // TODO determine if tagsloaded is needed here
      loadTags();
      setTagsLoaded(true);
    }
  }, [isSignedIn])

  return (
    <Modal>
      <div ref={(c) => tagManagerElement = c} className="tag-manager">
        <div>
          <h2>TAGS</h2>
        </div>
        <div>
          <input placeholder="Add a tag and press enter"
            type="text"
            className="tag-manager__addTagInput"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTag(newTagName)} />
        </div>
        <div>
          <TagList tags={tags} removeTag={removeTag} />
        </div>
      </div>
    </Modal>
  );
}

export default TagManager;