// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyCFk5O5QxQPeRhguMK931JMyrgsSGVvhho",
    authDomain: "whatsapp-clone-ae94e.firebaseapp.com",
    projectId: "whatsapp-clone-ae94e",
    storageBucket: "whatsapp-clone-ae94e.appspot.com",
    messagingSenderId: "870987218434",
    appId: "1:870987218434:web:44395f128fa5ed1b2b311b",
    measurementId: "G-X2SWBE2DWB"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore(); 
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;