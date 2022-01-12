import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyATuEjo6QexRzW3H18cUKIuj3-KsTSfuW0",
    authDomain: "chillzone-cef46.firebaseapp.com",
    projectId: "chillzone-cef46",
    storageBucket: "chillzone-cef46.appspot.com",
    messagingSenderId: "299597821188",
    appId: "1:299597821188:web:ff3a949256e790d14bcc51"
  }).auth(); 
  //exported as a function
