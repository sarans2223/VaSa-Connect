// src/firebase.js

// 1. Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// 2. Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClKKrYHgGnW2ltvrXPd5mTrwVVrcEdvkE",
  authDomain: "studio-9096752878-3dca9.firebaseapp.com",
  projectId: "studio-9096752878-3dca9",
  storageBucket: "studio-9096752878-3dca9.appspot.com",
  messagingSenderId: "789054864730",
  appId: "1:789054864730:web:5cb3158728adf02b8bdc63"
};


// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 4. Export Auth + Google provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// 5. Default export
export default app;
