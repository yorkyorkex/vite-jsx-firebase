// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCV1u_oU5AoSIUfWvGtaI8dENTJo8KmVB8',
  authDomain: 'test1-b957f.firebaseapp.com',
  projectId: 'test1-b957f',
  storageBucket: 'test1-b957f.firebasestorage.app',
  messagingSenderId: '183258667350',
  appId: '1:183258667350:web:2dfdec14a064321aa6def7',
  measurementId: 'G-FNTGHXF99B',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth(app)
