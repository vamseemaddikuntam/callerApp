// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9LuopbTnmh2Ck9oPmblN3afhe2Rjmnyk",
  authDomain: "newcallerapp.firebaseapp.com",
  projectId: "newcallerapp",
  storageBucket: "newcallerapp.appspot.com",
  messagingSenderId: "576163770499",
  appId: "1:576163770499:web:d86aa0de534f16701babb6",
  measurementId: "G-PHH0GZK84W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);