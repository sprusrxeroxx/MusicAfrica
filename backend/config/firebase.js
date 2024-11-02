import firebase from 'firebase/compat/app';
import admin from 'firebase-admin';
import serviceAccount from '../FirebaseService.json' with {type: "json"};
import dotenv from 'dotenv';

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail
 } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.API_KEY || "Dummy Key",
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MEASUREMENT_ID,
    appId: process.env.APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initializes firebase admin SDK in express app
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Exporting methods

export {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail,
};

export default admin;
