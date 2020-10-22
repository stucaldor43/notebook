import React, { useEffect, useState } from "react";
import useNoteStore from "../stores/useNoteStore.jsx";
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
  const { user, isSignedIn } = useAuth();
  const store = useNoteStore([]);

  useEffect(() => {
    store.load();
  }, [])

  return (
    <AuthContext.Provider value={{ user, isSignedIn }}>
      <Fade childKey={window.location.pathname}
        enter={1000}
        exit={1000}
        classes={"my-node"}>
        {React.cloneElement(children, { store: store })}
      </Fade>
      <button style={{ zIndex: "99999", position: "absolute", cursor: 'pointer' }} onClick={() => firebase.auth().signOut()}>Sign Out</button>
    </AuthContext.Provider>
  );
}

export default App;