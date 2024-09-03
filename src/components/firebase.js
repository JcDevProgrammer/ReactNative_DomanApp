
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from 'firebase/functions';
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxWsvCCo4LIhqvtbA85JA-7YGWMJuJhIA",
  authDomain: "domanapp.firebaseapp.com",
  projectId: "domanapp",
  storageBucket: "domanapp.appspot.com",
  messagingSenderId: "477555580567",
  appId: "1:477555580567:web:d0c916a5acf46c7cf053d2",
  measurementId: "G-M5Y4100VGY"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app
