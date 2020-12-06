import 'regenerator-runtime/runtime'
import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './src/js/pages/Home.jsx';
import SignupPage from './src/js/pages/Signup.jsx';
import SigninPage from './src/js/pages/Signin.jsx';
import EditNotePage from './src/js/pages/NoteEditor.jsx';
import App from './src/js/pages/App.jsx';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import notesAPI from "./src/js/api/notes";
import ErrorPage from './src/js/pages/Error.jsx';

function isUserAuthorized() {
  firebase.auth().currentUser ? true : false;
}

function Notebook() {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        {/* <Route path="note/:id" component={EditNotePage}/> // TODO serve 404 page instead if id doesn't match one of the users notes. Edit note page should not be rendered at all to prevent errors due to undefined variables */}
        <Route path="note/:id" getComponent={async (nextState, cb) => {
          const note = await notesAPI().findNote(nextState.params.id);
          if (!note) return ErrorPage // TODO redirect to 404 page here instead
          return EditNotePage;
          // get note editor if id matches a note owned by user
          // otherwise error
          // app should render noteeditor with note prop set to appropriate id
          // use that note prop throughout instead of current note state which can be erased (single source truth)
        }} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/signin" component={SigninPage} />
        <Route path="*" component={ErrorPage} />
      </Route>
    </Router>
  )
}

const reactContainer = document.getElementById("view");

window.addEventListener("load", () => {
  ReactDOM.render(<Notebook />, reactContainer);
});