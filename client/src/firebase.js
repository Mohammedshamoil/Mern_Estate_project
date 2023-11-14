// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

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
 export const storage=getStorage(app)


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAySYG8HPywLGP2Nb4AwQhfsPe76P4CDJA",
//   apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: "realestateimages-b0135.firebaseapp.com",
//   projectId: "realestateimages-b0135",
//   storageBucket: "realestateimages-b0135.appspot.com",
//   messagingSenderId: "144538657219",
//   appId: "1:144538657219:web:ea162b1c819aae5eb95d76"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const storage=getStorage(app)
