// Firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY || "";

const firebaseConfig = {
  apiKey,
  authDomain: "clone-2025-42090.firebaseapp.com",
  projectId: "clone-2025-42090",
  // Confirm the storage bucket string in Firebase console (often *.appspot.com)
  storageBucket: "clone-2025-42090.firebasestorage.app",
  messagingSenderId: "1088052955106",
  appId: "1:1088052955106:web:12ef9cac419e480ec41bbb",
};

if (!apiKey) {
  console.error(
    "Missing Firebase API key: set VITE_FIREBASE_API_KEY in a .env file at project root and restart the dev server."
  );
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
