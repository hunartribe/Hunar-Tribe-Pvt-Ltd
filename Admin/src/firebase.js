// Firebase bootstrap for the admin app.
// Config comes from VITE_FIREBASE_* env vars (see .env.example); the literals
// are the existing hunar-tribe project, kept as a fallback so a checkout runs
// without extra setup. Vite inlines these at build time.

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Named Firestore database, not "(default)" - see the frontend config.
export const DATABASE_ID = env.VITE_FIREBASE_DATABASE_ID || "hunar-tribe";

export const db = getFirestore(app, DATABASE_ID);
export const storage = getStorage(app);

// Where the public site is served, used by the "View on site" links.
export const SITE_URL = env.VITE_SITE_URL || "http://localhost:3000";

export default app;
