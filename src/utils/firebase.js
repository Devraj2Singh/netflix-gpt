// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsH5Q5VySwiga7PDVmK_Gej6jHppfoxEU",
  authDomain: "netflixgpt-38115.firebaseapp.com",
  projectId: "netflixgpt-38115",
  storageBucket: "netflixgpt-38115.firebasestorage.app",
  messagingSenderId: "911920495924",
  appId: "1:911920495924:web:661bc31868d53052537961",
  measurementId: "G-X1ZYKWPK2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();