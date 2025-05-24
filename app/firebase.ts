// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyAKSS-CASngT3fFXsesJA5a7qb6DuCQc",
  authDomain: "cbt-project-c3de8.firebaseapp.com",
  projectId: "cbt-project-c3de8",
  storageBucket: "cbt-project-c3de8.firebasestorage.app",
  messagingSenderId: "686297363236",
  appId: "1:686297363236:web:3c1cfe79ff088564b8b9b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
