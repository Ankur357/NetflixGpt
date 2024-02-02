// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHvwHMCpDAtcXh7P1RpxzLL67iks8M9aw",
  authDomain: "netflixgpt-da9a9.firebaseapp.com",
  projectId: "netflixgpt-da9a9",
  storageBucket: "netflixgpt-da9a9.appspot.com",
  messagingSenderId: "535587148396",
  appId: "1:535587148396:web:15d7f2897ca8d0eb397e49",
  measurementId: "G-QZNQXGY6JS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
