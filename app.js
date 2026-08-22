// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChQAc7K7EFNZUnDaqT1aihnia5luxzn-o",
  authDomain: "noguerabeauti.firebaseapp.com",
  projectId: "noguerabeauti",
  storageBucket: "noguerabeauti.firebasestorage.app",
  messagingSenderId: "310766282869",
  appId: "1:310766282869:web:8ed911aea7e3792026f03c",
  measurementId: "G-JWXC3X3JFD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);