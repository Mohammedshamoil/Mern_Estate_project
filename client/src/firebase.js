// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-fa965.firebaseapp.com",
  projectId: "mern-estate-fa965",
  storageBucket: "mern-estate-fa965.appspot.com",
  messagingSenderId: "859164571348",
  appId: "1:859164571348:web:38a3934804dd3d5637ad41"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);