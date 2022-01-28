import { combineReducers } from "redux";
import {firebaseReducer, reducer as firebase} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";

const rootReducer = combineReducers({
    firebase : firebaseReducer,
    firestore : firestoreReducer
});

export default rootReducer;
