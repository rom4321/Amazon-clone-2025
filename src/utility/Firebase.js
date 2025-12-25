// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "clone-2025-42090.firebaseapp.com",
  projectId: "clone-2025-42090",
  storageBucket: "clone-2025-42090.firebasestorage.app",
  messagingSenderId: "1088052955106",
  appId: "1:1088052955106:web:12ef9cac419e480ec41bbb"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Get the authentication service for signing in and out of your app
export const auth = getAuth(app);

// Get the Firestore database for storing and retrieving data
export const db = app.firestore();