// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, getAnalytics } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, 
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  //   apiKey: "AIzaSyBjDp1IYPrjbcEPR8Ft3s_5lRKHlTDeg5Q",
  // authDomain: "mycrypto-5796e.firebaseapp.com",
  // projectId: "mycrypto-5796e",
  // storageBucket: "mycrypto-5796e.firebasestorage.app",
  // messagingSenderId: "319525460517",
  // appId: "1:319525460517:web:863ffe091fb8af14eebdcc",
  // measurementId: "G-NLXJKY7K4Q"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app);
const db = getFirestore(app);

// Export what you need
export { app, auth, db };