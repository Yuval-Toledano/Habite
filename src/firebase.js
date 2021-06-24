import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCu3dw7v3W34y6PV-7cs8v06804kk_99lQ",
  authDomain: "habite-fd756.firebaseapp.com",
  databaseURL: "https://habite-fd756-default-rtdb.firebaseio.com",
  projectId: "habite-fd756",
  storageBucket: "habite-fd756.appspot.com",
  messagingSenderId: "687210682011",
  appId: "1:687210682011:web:0d7df7bf5eba1a9973183e",
  measurementId: "G-TESPG80H3L",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = app.firestore();
db.settings({
  timestampsInSnapshots: true,
});

export const storage = app.storage();

export default app