import 'regenerator-runtime/runtime'
import {Router} from '@vaadin/router';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App.jsx';
import SignupPage from './src/js/pages/Signup.jsx';
import SigninPage from './src/js/pages/Signin.jsx';

function isUserAuthorized() {
  firebase.auth().currentUser ? true : false;
}

const routerMountPoint = document.getElementById("app");
const reactContainer = document.getElementById("view");
const emptyElement = document.createElement("div");

const router = new Router(routerMountPoint);
window.Router = Router;

router.setRoutes([
  {
    path: '/',
    children: [
      {path: '', action: (context, commands) => {
        if (!isUserAuthorized) Router.go('/signup');
        ReactDOM.render(<App/>, reactContainer);
        return emptyElement;
      }},
      {path: '/signup', action: (context, commands) => {
        ReactDOM.render(<SignupPage router={router}/>, reactContainer);
        return emptyElement;
      }},
      {path: '/signin', action: (context, commands) => {
        ReactDOM.render(<SigninPage/>, reactContainer);
        return emptyElement;
      }},
      {path: '(.*)', action: (context, commands) => {
        const el = document.createElement("div");
        el.textContent = "Error 404";
        return el;
      }}
    ]
  }
])