// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-1978.firebaseapp.com",
  projectId: "mern-estate-1978",
  storageBucket: "mern-estate-1978.appspot.com",
  messagingSenderId: "265947225224",
  appId: "1:265947225224:web:4a38b180b64cd7e7c0933d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// firebase storage
// allow read;
// allow write: if
// request.resource.size < 2*1024*1024 &&
// request.resource.contentType.matches('image/.*')