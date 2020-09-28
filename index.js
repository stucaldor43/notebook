import 'regenerator-runtime/runtime'
import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './src/js/pages/Home.jsx';
import SignupPage from './src/js/pages/Signup.jsx';
import SigninPage from './src/js/pages/Signin.jsx';
import EditNotePage from './src/js/pages/NoteEditor.jsx';
import App from './src/js/pages/App.jsx';
import { Router, Route, IndexRoute, hashHistory} from 'react-router';

function isUserAuthorized() {
  firebase.auth().currentUser ? true : false;
}

function Notebook() {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="note/:id" component={EditNotePage}/>
      </Route>
      <Route path="signup" component={SignupPage}/>
      <Route path="signin" component={SigninPage}/>
    </Router>
  )
}

const reactContainer = document.getElementById("view");

window.addEventListener("load", () => {
  ReactDOM.render(<Notebook/>, reactContainer);
});