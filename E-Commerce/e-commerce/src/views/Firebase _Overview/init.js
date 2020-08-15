import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyC4tJNyqZl4BuA08fHxVJWaDQae0R8WQ0c",
    authDomain: "unbox-11.firebaseapp.com",
    databaseURL: "https://unbox-11.firebaseio.com",
    projectId: "unbox-11",
    storageBucket: "unbox-11.appspot.com",
    messagingSenderId: "892634478026",
    appId: "1:892634478026:web:bc928a9bd4a6b664aacb33",
    measurementId: "G-7725TKDKRG"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics();

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();