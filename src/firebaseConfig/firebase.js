// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFm8hbuGYcz7nYA6sim71A2PlVPezQ5vM",
  authDomain: "resturant-crud.firebaseapp.com",
  projectId: "resturant-crud",
  storageBucket: "resturant-crud.firebasestorage.app",
  messagingSenderId: "262184930619",
  appId: "1:262184930619:web:53db5518b096d85cd7bb1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// para la conexion a la base de datos
export const db = getFirestore(app)