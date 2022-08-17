// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOHqoWw2J7f1EM0e6EX25PA5PGNyyrE8Y",
  authDomain: "lab-notes2022.firebaseapp.com",
  projectId: "lab-notes2022",
  storageBucket: "lab-notes2022.appspot.com",
  messagingSenderId: "826897965259",
  appId: "1:826897965259:web:5fc94a216ce465dfe3bb4e",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
