import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeIBLaI2msxOASlrnJVfxlodL5SQi3yQo",
  authDomain: "plaide.firebaseapp.com",
  projectId: "plaide",
  storageBucket: "plaide.firebasestorage.app",
  messagingSenderId: "195398010710",
  appId: "1:195398010710:web:24e92dde7de8ff53d038f7",
  measurementId: "G-NYXRJ2M15T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export default app;
