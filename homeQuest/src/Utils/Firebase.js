

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// https://www.youtube.com/watch?v=rbuSx1yEgV8&ab_channel=Firebase

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/storage'

import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGw1_1SM-lHxJyN8Wpd0gW5ka5TgcvfOQ",
  authDomain: "homequestnz.firebaseapp.com",
  projectId: "homequestnz",
  storageBucket: "homequestnz.appspot.com",
  messagingSenderId: "196479687937",
  appId: "1:196479687937:web:413407c193977287ac0f00",
  measurementId: "G-81J66JHZ1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


const auth = getAuth(app);


//for google auth
const provider =new GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
auth.languageCode = 'it';


export {app,auth,provider}