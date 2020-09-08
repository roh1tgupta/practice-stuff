import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAQuMFyn-dm4r5qyEptK2r4Bj0oJkiZI4c",
  authDomain: "learning-firebase-projec-c06ba.firebaseapp.com",
  databaseURL: "https://learning-firebase-projec-c06ba.firebaseio.com",
  projectId: "learning-firebase-projec-c06ba",
  storageBucket: "learning-firebase-projec-c06ba.appspot.com",
  messagingSenderId: "674384699611",
  appId: "1:674384699611:web:739a2317c17ea04074ecfe",
  measurementId: "G-08RFYP55Q2"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;