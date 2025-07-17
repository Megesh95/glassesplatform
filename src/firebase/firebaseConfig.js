// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQ-uIdTPlErK8cKYQt8ad4Q8NAWO1CcRA",
  authDomain: "valscolenskart.firebaseapp.com",
  projectId: "valscolenskart",
  storageBucket: "valscolenskart.firebasestorage.app",
  messagingSenderId: "953596539950",
  appId: "1:953596539950:web:367c84264028fef5999bbf",
  measurementId: "G-BEGTB13ZWB"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


export { app, auth };