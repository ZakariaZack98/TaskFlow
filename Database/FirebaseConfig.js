// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJFLj05XLPx6LvSmThJZzfKMPdAL3jh8o",
  authDomain: "taskflow-f4179.firebaseapp.com",
  projectId: "taskflow-f4179",
  storageBucket: "taskflow-f4179.firebasestorage.app",
  messagingSenderId: "655020118768",
  appId: "1:655020118768:web:e3878f9964fb2a72032835"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db }