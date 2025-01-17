// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqIVLznmWvQfC_4NYsz9s0JpHa1Hq_Hj8",
  authDomain: "beautydrop-63d07.firebaseapp.com",
  projectId: "beautydrop-63d07",
  storageBucket: "beautydrop-63d07.firebasestorage.app",
  messagingSenderId: "240684071097",
  appId: "1:240684071097:web:95e3f3ec88d68fad5dc368",
  measurementId: "G-HDS2N38FVB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };