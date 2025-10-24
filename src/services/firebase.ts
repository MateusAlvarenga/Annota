import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


/**
 *  
 * 
 *  apiKey: "AIzaSyC2tjlAq2fhHBd-JpEdALx4JYEhwFxy0zo",
  authDomain: "annota-f0068.firebaseapp.com",
  projectId: "annota-f0068",
  storageBucket: "annota-f0068.firebasestorage.app",
  messagingSenderId: "652619113842",
  appId: "1:652619113842:web:688b7186e1db2d404e69eb"
 * 
 * 
 */


const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

 