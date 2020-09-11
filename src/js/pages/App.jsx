import React, { useEffect, useState } from "react";
import useNoteStore from "../stores/useNoteStore.jsx";
import NoteContext from "./../context/note-context";
import Fade from "../components/Fade.jsx";
import AuthContext from "./../context/auth-context";

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      user ? setUser(user) : setUser(false)
    });

    return () => unsubscribe();
  }, []);

  return { user, isSignedIn: !!user };
}

function App({ children, location }) {
  const { notes, setNotes, addNote, editNote, deleteNote, selectNote, save, load } = useNoteStore([]);
  const { user, isSignedIn } = useAuth();

  useEffect(() => {
    load();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isSignedIn }}>
      <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, selectNote, save, load }}>
        <Fade childKey={location.pathname}
          enter={1000}
          exit={1000}
          classes={"my-node"}>
          {children}
        </Fade>
        <button style={{ left: "88%", position: "absolute", cursor: 'pointer' }} onClick={() => firebase.auth().signOut()}>Sign Out</button>
      </NoteContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;