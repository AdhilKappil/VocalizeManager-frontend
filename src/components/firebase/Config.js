// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoTzmmxKQhuSEiEhfMl79JG871vvePack",
  authDomain: "react-ums.firebaseapp.com",
  projectId: "react-ums",
  storageBucket: "react-ums.appspot.com",
  messagingSenderId: "931616089329",
  appId: "1:931616089329:web:78daf6d0e2856a680a3550",
  measurementId: "G-BH5PFCFDWM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);


