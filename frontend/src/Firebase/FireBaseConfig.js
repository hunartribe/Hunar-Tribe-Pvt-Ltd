// Firebase bootstrap for the public site.
// Config comes from VITE_FIREBASE_* env vars; the literals below are the
// existing hunar-tribe project and stay as a fallback so the app keeps
// working when no .env file is present.

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const env = import.meta.env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyAIMVLsFodqHOWMYr-UJjm8DQyBTiJrREQ",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "hunar-tribe.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "hunar-tribe",
  storageBucket:
    env.VITE_FIREBASE_STORAGE_BUCKET || "hunar-tribe.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1089289253184",
  appId: env.VITE_FIREBASE_APP_ID || "1:1089289253184:web:8f12b4d4e11e5653638aa5",
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || "G-M4CYJQZMH4",
};

const app = initializeApp(firebaseConfig);

// This project uses a NAMED Firestore database ("hunar-tribe"), not the
// unnamed "(default)" one. getFirestore(app) would silently target a database
// that does not exist, so the id has to be passed explicitly.
export const DATABASE_ID = env.VITE_FIREBASE_DATABASE_ID || "hunar-tribe";

export const db = getFirestore(app, DATABASE_ID);
export const storage = getStorage(app);
export default app;
