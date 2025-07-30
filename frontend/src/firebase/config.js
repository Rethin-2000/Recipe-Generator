
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import dotenv from 'dotenv';
import meta from 'meta';
dotenv.config();
const firebaseConfig = {
  apiKey: meta.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: meta.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: meta.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: meta.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage  = getStorage(app);

//const analytics = getAnalytics(app);