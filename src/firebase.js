// src/services/firebase.js

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCVK1C5A8tzd75G50L9SMoZg1CEi8NPzfo',
  authDomain: 'personal-trainer-72d8d.firebaseapp.com',
  projectId: 'personal-trainer-72d8d',
  storageBucket: 'personal-trainer-72d8d.appspot.com',
  messagingSenderId: '634042426536',
  appId: '1:634042426536:web:dd665dfed5a94895834e9d',
  measurementId: 'G-8RRSERT121',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
