import 'regenerator-runtime/runtime'
import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './src/js/pages/Home.jsx';
import SignupPage from './src/js/pages/Signup.jsx';
import SigninPage from './src/js/pages/Signin.jsx';
import EditNotePage from './src/js/pages/NoteEditor.jsx';
import App from './src/js/pages/App.jsx';
import UniversalRouter from 'universal-router';

function isUserAuthorized() {
  firebase.auth().currentUser ? true : false;
}

const routes = [
  {
    path: '',
    children: [
      {
        path: '',
        action: async (context, params) => {
          const childPage = await context.next();
          if (!childPage) return;
          if (!isUserAuthorized) return ({ redirect: '/signup' });
          return { element: <App child={<div>{childPage.element}</div>} /> };
        },
        children: [
          {
            path: '',
            action: () => {
              return { element: <HomePage /> };
            }
          },
          {
            path: '/note/:id',
            action: (context, params) => {
              return { element: <EditNotePage noteId={params.id} /> };
            }
          }
        ]
      },
    ]
  },
  {
    path: '/signup',
    action: (context) => {
      return { element: <SignupPage router={context.router} /> };
    }
  },
  {
    path: '/signin',
    action: () => {
      return ({ element: <SigninPage router={null} /> });
    }
  },
  {
    path: '(.*)',
    action: () => {
      return { element: <div>Error 404</div> };
    }
  }
];

const reactContainer = document.getElementById("view");
const router = new UniversalRouter(routes)

router.resolve(location.pathname)
  .then(page => {
    if (page.redirect) return window.location = (page.redirect)
    ReactDOM.render(page.element, reactContainer);
  })