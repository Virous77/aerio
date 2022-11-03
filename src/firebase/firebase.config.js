import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  // authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DB,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  apiKey: "AIzaSyBesBmTOLopfhOvrVaux0ArD59Ixhr98Fk",
  authDomain: "users-559a2.firebaseapp.com",
  databaseURL:
    "https://users-559a2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "users-559a2",
  storageBucket: "users-559a2.appspot.com",
  messagingSenderId: "878997352762",
  appId: "1:878997352762:web:101ec29faf6b29365e6003",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
