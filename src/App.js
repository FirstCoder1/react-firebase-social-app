import React from 'react';
import './App.css';
import { Layout } from './layout/layout';
import firebase, { getAuth, getRedirectResult, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

const provider = new GoogleAuthProvider();
function App(props) {

  const [ user, setUser] = React.useState(null);

  React.useEffect(() => {

    var auth = getAuth();
    onAuthStateChanged(auth,(user) => {
          if(user == null){
            showGoogleLoginPopup(auth);
          }
          else
              setUser(user);
        });
    
    // auth.signOut();

  },[])

  function showGoogleLoginPopup(auth){
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }


  
  return (
    user != null ?
  <Layout {...props} user={user} /> : null
  ); 
}

export default App;
