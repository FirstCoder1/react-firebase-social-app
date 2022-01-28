import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import createStore from "./createStore";
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'
import 'antd/dist/antd.css';

// const firebaseConfig = {
//   apiKey: "AIzaSyDeGV1bdUTX5eSHKWIWiP9L99KV6G5sFEc",
//   authDomain: "finbit-53579.firebaseapp.com",
//   databaseURL: "https://finbit-53579-default-rtdb.firebaseio.com",
//   projectId: "finbit-53579",
//   storageBucket: "finbit-53579.appspot.com",
//   messagingSenderId: "806680498465",
//   appId: "1:806680498465:web:87346f6f808fb53e182e60",
//   measurementId: "G-X41GS0ZH8M"
// };

const firebaseConfig = {
  apiKey: "AIzaSyChBgAdAlmIZANHI5J6cFdyswNnQ1rJo8g",
  authDomain: "react-firebase-social-61d47.firebaseapp.com",
  projectId: "react-firebase-social-61d47",
  storageBucket: "react-firebase-social-61d47.appspot.com",
  messagingSenderId: "782706095126",
  appId: "1:782706095126:web:fe0c3512cf2c845ad43137",
  measurementId: "G-Y9M306REVB"
};



try {
    firebase.initializeApp(firebaseConfig);
    firebase.firestore();
} catch (err) {}

const store = createStore();

const rrfProps = {
    firebase,
    config: {
        userProfile: "users"
    },
    dispatch: store.dispatch,
    createFirestoreInstance
};



ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <ReactReduxFirebaseProvider {...rrfProps}>
              <App />
          </ReactReduxFirebaseProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
