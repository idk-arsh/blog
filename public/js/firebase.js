// firebase.js

const firebaseConfig = {
    apiKey: "AIzaSyBiGH-3e-lNxiWqOFz9iL7kXzVzqeNNUkw",
    authDomain: "blog-1841c.firebaseapp.com",
    projectId: "blog-1841c",
    storageBucket: "blog-1841c.appspot.com",
    messagingSenderId: "168208982494",
    appId: "1:168208982494:web:e685d8d0a1cdd4a2407d4f",
    measurementId: "G-1S22TZYE1V"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize Firestore
  const db = firebase.firestore();
  
