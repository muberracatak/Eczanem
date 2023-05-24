import { initializeApp } from 'firebase/app';
import { getStorage, ref } from "firebase/storage";
import { getDatabase } from 'firebase/database';
import { getAuth } from "firebase/auth"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKRqBjzJDFzi5a9RadrXgvS2snWcbNdXw",
    authDomain: "eczanemnerde.firebaseapp.com",
    projectId: "eczanemnerde",
    storageBucket: "eczanemnerde.appspot.com",
    messagingSenderId: "201323873499",
    appId: "1:201323873499:web:d96d5984ae6e82282238fe"
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const db = getDatabase(app);
export { db };
export const database = getFirestore();
const auth = getAuth(app);
export { auth };



