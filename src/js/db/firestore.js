import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJjNdRCbx_f23M0WxSpkAylVYBSqKT894",
  authDomain: "chatterino-33b9c.firebaseapp.com",
  projectId: "chatterino-33b9c",
  storageBucket: "chatterino-33b9c.appspot.com",
  messagingSenderId: "101640917978",
  appId: "1:101640917978:web:563b110e441918c8fe66e3",
  measurementId: "G-2HP4D3PRX2",
};

// Initialize Firebase
const db = firebase.initializeApp(firebaseConfig).firestore();
export default db;
