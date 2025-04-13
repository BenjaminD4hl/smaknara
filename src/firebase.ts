// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: 'smaknara',
  storageBucket: 'smaknara.appspot.com',
  messagingSenderId: '460067712570',
  appId: '1:460067712570:web:c9b8331bcde1a3454c0f03', // Optional unless you use analytics
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); // ✅ Added this line
