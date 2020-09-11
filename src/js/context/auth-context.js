import React from 'react';

const AuthContext = React.createContext({
  user: {},
  isSignedIn: false
});

export default AuthContext;