import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAdh0ktN3FWOGVkkmVaamU70twjX5JQc6I",
  authDomain: "tiktok-clone-othman-475b7.firebaseapp.com",
  projectId: "tiktok-clone-othman-475b7",
  storageBucket: "tiktok-clone-othman-475b7.firebasestorage.app",
  messagingSenderId: "777771813179",
  appId: "1:777771813179:web:242f1248ccb0ad174dcf1e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
