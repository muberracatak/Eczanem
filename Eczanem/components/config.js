// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage, ref } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKRqBjzJDFzi5a9RadrXgvS2snWcbNdXw",
    authDomain: "eczanemnerde.firebaseapp.com",
    projectId: "eczanemnerde",
    storageBucket: "eczanemnerde.appspot.com",
    messagingSenderId: "201323873499",
    appId: "1:201323873499:web:d96d5984ae6e82282238fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);