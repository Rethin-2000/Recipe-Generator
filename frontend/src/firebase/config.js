
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCp1t4FCLUPHX1zcneaJ7fAsVL_Ey8708c",
  authDomain: "recipie-50e2f.firebaseapp.com",
  projectId: "recipie-50e2f",
  storageBucket: "recipie-50e2f.firebasestorage.app",
  messagingSenderId: "512886393032",
  appId: "1:512886393032:web:c64c17face632d52187dfd",
  measurementId: "G-8TWBF4FW63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage  = getStorage(app);

//const analytics = getAnalytics(app);