import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyByJAjBRdGDnKUREwY1rXUFh5hw22I-lEE",
    authDomain: "chat-app-8df88.firebaseapp.com",
    databaseURL: "https://chat-app-8df88-default-rtdb.firebaseio.com",
    projectId: "chat-app-8df88",
    storageBucket: "chat-app-8df88.appspot.com",
    messagingSenderId: "866696205577",
    appId: "1:866696205577:web:750789bebd8e66d451efd8"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth(),
    db = firebase.database(),
    storage = firebase.storage();

export {auth, db, storage};