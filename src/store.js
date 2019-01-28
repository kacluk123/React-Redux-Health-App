import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import firebase from 'firebase'
import IDReducer from './reducers/IDReducer'
import { reduxFirestore, firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import 'firebase/firestore' // <- needed if using firestore

const firebaseConfig = {
    apiKey: "AIzaSyA_jO-V_w_ByoodxQtWUrNvZr8iZQyIsDA",
    authDomain: "health-app-51ae6.firebaseapp.com",
    databaseURL: "https://health-app-51ae6.firebaseio.com",
    projectId: "health-app-51ae6",
    storageBucket: "health-app-51ae6.appspot.com",
    messagingSenderId: "868282735145",
    timestampsInSnapshots: true,
}

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true,
}

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);


firebase.firestore() // <- needed if using firestore


const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
        firebase: firebaseReducer,
        firestore: firestoreReducer,
        idRed: IDReducer ,
})

// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),

));

export default store;