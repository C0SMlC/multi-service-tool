import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBq8Nhugc-KI10f7_i5O14D-JoX5vZ--rY",
  authDomain: "shorty-433d6.firebaseapp.com",
  projectId: "shorty-433d6",
  storageBucket: "shorty-433d6.firebasestorage.app",
  messagingSenderId: "797651757706",
  appId: "1:797651757706:web:4cfa1ed68ed01abaf91b73",
  measurementId: "G-ZQY0KC2D6E",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);

export { auth };

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBq8Nhugc-KI10f7_i5O14D-JoX5vZ--rY",
//   authDomain: "shorty-433d6.firebaseapp.com",
//   projectId: "shorty-433d6",
//   storageBucket: "shorty-433d6.firebasestorage.app",
//   messagingSenderId: "797651757706",
//   appId: "1:797651757706:web:4cfa1ed68ed01abaf91b73",
//   measurementId: "G-ZQY0KC2D6E",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
