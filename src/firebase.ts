import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDRODyrbORNhTb5fS11gRoPi_PsFO-Fuao',
  authDomain: 'smaknara.firebaseapp.com',
  projectId: 'smaknara',
  storageBucket: 'smaknara.firebasestorage.app',
  messagingSenderId: '460067712570',
  appId: '1:460067712570:web:c9b8331bcde1a3454c0f03',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
