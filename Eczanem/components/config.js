// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4DIMOn6EZANAAmoMHcmB7K9RSDlc6bgg",
    authDomain: "eczanem-2091e.firebaseapp.com",
    projectId: "eczanem-2091e",
    storageBucket: "eczanem-2091e.appspot.com",
    messagingSenderId: "369945845042",
    appId: "1:369945845042:web:054dd71ac3fdfee1668b2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
