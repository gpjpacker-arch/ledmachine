import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

// Default config or from config file
const firebaseConfig = {
  apiKey: "AIzaSyAvMqzdsGQEyv5dbLpsuDnXQUQF7lxUD80",
  authDomain: "reverberant-semiotics-8wgw1.firebaseapp.com",
  projectId: "reverberant-semiotics-8wgw1",
  storageBucket: "reverberant-semiotics-8wgw1.firebasestorage.app",
  messagingSenderId: "626971995090",
  appId: "1:626971995090:web:dc638f308ba9c8f367b60b",
  firestoreDatabaseId: "ai-studio-ledmachinepainis-278da281-8a38-4315-ae09-32eac634cd22"
};

let appInstance;
try {
  appInstance = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
} catch (e) {
  console.warn("Firebase App init fallback:", e);
}

let dbInstance: Firestore | null = null;
try {
  if (appInstance) {
    dbInstance = getFirestore(appInstance, firebaseConfig.firestoreDatabaseId || '(default)');
  }
} catch (e) {
  console.warn("Firestore init fallback:", e);
}

export const app = appInstance;
export const db = dbInstance;
