// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAZ4LAeskIzWHKy_P7kCiOl4hrj5Eaiv0",
  authDomain: "ecommerce-auth-4f790.firebaseapp.com",
  projectId: "ecommerce-auth-4f790",
  storageBucket: "ecommerce-auth-4f790.appspot.com",
  messagingSenderId: "958644099202",
  appId: "1:958644099202:web:f91fb65b1908b1f126bc9b",
  measurementId: "G-3GGJ72YSZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;