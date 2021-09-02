importScripts("https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.17.1/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    apiKey: "AIzaSyC4tJNyqZl4BuA08fHxVJWaDQae0R8WQ0c",
    authDomain: "unbox-11.firebaseapp.com",
    databaseURL: "https://unbox-11.firebaseio.com",
    projectId: "unbox-11",
    storageBucket: "unbox-11.appspot.com",
    messagingSenderId: "892634478026",
    appId: "1:892634478026:web:bc928a9bd4a6b664aacb33",
    measurementId: "G-7725TKDKRG"
});
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
firebase.messaging();
