// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyByLcUKs_I2Iy7_C6uPUqXkZ5v3i9SQSIw',
  authDomain: 'rechart-74a34.firebaseapp.com',
  projectId: 'rechart-74a34',
  storageBucket: 'rechart-74a34.appspot.com',
  messagingSenderId: '168798500684',
  appId: '1:168798500684:web:569113612c01c2ae3d41e9',
  measurementId: 'G-P6E3B5ENC5',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
