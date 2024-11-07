// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIFqXUllbRZvMcH3crkiZsV2iNYJmp28c",
  authDomain: "dishdash-f0f1d.firebaseapp.com",
  projectId: "dishdash-f0f1d",
  storageBucket: "dishdash-f0f1d.firebasestorage.app",
  messagingSenderId: "685995910916",
  appId: "1:685995910916:web:7c046be7ca75c54eed5251",
  measurementId: "G-PWP40Z1M3F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)