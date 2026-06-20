// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqfQhc52CdUu32cjkfeEBvEuxqwAmtwdU",
  authDomain: "wedding-invitation-6b5a7.firebaseapp.com",
  projectId: "wedding-invitation-6b5a7",
  storageBucket: "wedding-invitation-6b5a7.firebasestorage.app",
  messagingSenderId: "6931324170",
  appId: "1:6931324170:web:58a6179cb8494b7a6e6ef3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);