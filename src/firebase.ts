import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "your api",
  authDomain: "your project domain",
  projectId: "project id",
  storageBucket: "bucket",
  messagingSenderId: "messagingsenderid",
  appId: "",
  measurementId: "",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ new line
