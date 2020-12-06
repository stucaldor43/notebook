import React, { useEffect, useContext, useState } from 'react';
import AuthContext from "./../context/auth-context";
import TagList from './TagList';
import tagsAPI from "./../api/tags";
import Modal from './Modal';
import "./../../css/components/TagManager/styles.css";
import SnackBar from './Snackbar';

let tagManagerElement;

function TagManager({ onClose }) {
  const { user, isSignedIn } = useContext(AuthContext);
  //const { removeTagFromNotes, addTagToNotes, notes } = useContext(NoteContext);
  const [tags, setTags] = useState([]);
  const [tagsLoaded, setTagsLoaded] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [snackbarOptions, setSnackbarOptions] = useState({});
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const api = tagsAPI();

  const addTag = async (tagToAdd) => {
    const tagExists = typeof (await api.findTagByName(tagToAdd)) !== "undefined" ? true : false;
    if (tagExists) return openSnackbar("A tag with that name already exists.")
    const presentTags = await api.fetchTags();
    if (presentTags.length >= 50) return openSnackbar("You have reached the tag limit. To create more tags you should delete some of your existing tags.");

    try {
      await api.createTag(tagToAdd);
    }
    catch (e) {
      console.log(e);
      openSnackbar("Failed to create tag. Please try again later.");
      return;
    }

    setTags(tags.concat([tagToAdd]));
    setNewTagName("");
  }

  const removeTag = async (tagToRemove) => {
    try {
      await api.deleteTag(tagToRemove);
    }
    catch (e) {
      console.log(e);
      openSnackbar("Failed to delete tag. Please try again later.");
      return;
    }

    setTags(tags.filter(tag => tag !== tagToRemove));
  }

  const openSnackbar = (text) => {
    setSnackbarOptions({text, timeout: 5000, multiline: true})
    setIsSnackbarOpen(true);
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
      {
        isSnackbarOpen &&
        <SnackBar options={snackbarOptions} close={() => setIsSnackbarOpen(false)} />
      }
    </Modal>
  );
}

export default TagManager;