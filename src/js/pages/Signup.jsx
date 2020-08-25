import React, { useState } from 'react';
import "./../../css/pages/signup/styles.css";

function matchesValidEmailPattern(email) {
  const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
  return email.match(regex) ? true : false;
}

async function createNewUserAccount(email, password, username) {
  const isEmailInValidFormat = matchesValidEmailPattern(email);
  if (!isEmailInValidFormat) return alert('Email is in invalid format');
  if (password.length < 6) return alert('Password has insufficient length. A minimum of 6 characters is required');
  const userDocRef = await db.collection("users").doc(username).get();
  const isUsernameTaken = userDocRef.exists;
  if (isUsernameTaken) return alert('Sorry, that userID / username is taken')

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      const user = firebase.auth().currentUser;
      user.updateProfile({displayName: username})
      return user;
    })
    .then((user) => {
      return db.collection("users").doc(username).set({ email });
    })
    .then(() => Router.go('/'))
    .catch((error) => {
      alert(error.message);
    })
}

function SignupPage({ router }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');

  return (<article className="page signup">
    <div className="form-container">
      <form onSubmit={(e) => { e.preventDefault(); createNewUserAccount(email, password, userId); }}>
        <div>
          <h2>Welcome</h2>
          <p className="flavor-text">Lets get you all set up so you can start taking notes</p>
        </div>
        <div>
          <label htmlFor="signup-email-field">Email</label>
          <input id="signup-email-field" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="signup-password-field">Password</label>
          <input id="signup-password-field" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label htmlFor="signup-userid-field">UserID</label>
          <input id="signup-userid-field" type="text" name="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </div>
        <div>
          <input type="submit" value="Sign up" />
          <p className="sign-in-text">Already have an account? <a href="/signin">Sign in now</a></p>
        </div>
      </form>
    </div>
    <div className="image-container">

    </div>
  </article>)
}

export default SignupPage;