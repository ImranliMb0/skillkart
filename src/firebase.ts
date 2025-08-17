import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1h_qzTYJxVmH2DYa04z-F2o6gzvwvfEg",
  authDomain: "skillkart-964bf.firebaseapp.com",
  projectId: "skillkart-964bf",
  storageBucket: "skillkart-964bf.appspot.com",
  messagingSenderId: "146446808537",
  appId: "1:146446808537:web:4a2460e895b90c1c11d5c8",
  measurementId: "G-S7H727VY1N",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ new line
