// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqIVLznmWvQfC_4NYsz9s0JpHa1Hq_Hj8",
  authDomain: "beautydrop-63d07.firebaseapp.com",
  projectId: "beautydrop-63d07",
  storageBucket: "beautydrop-63d07.appspot.com",
  messagingSenderId: "240684071097",
  appId: "1:240684071097:web:95e3f3ec88d68fad5dc368",
  measurementId: "G-HDS2N38FVB"
};


// Initialize Firebase
// const initializeauth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });


// Set up persistence for AsyncStorage
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, 
{ persistence: getReactNativePersistence(AsyncStorage) });


let analytics = null;
isSupported().then(yes => {
  if (yes) {
    analytics = getAnalytics(app);
  }
});

export default app;