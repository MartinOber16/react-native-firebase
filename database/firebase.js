import firebase from 'firebase';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBkAJnHDxEEZIyDzovu5cvcYIZN04MWeaU",
    authDomain: "react-native-firebase-7223e.firebaseapp.com",
    projectId: "react-native-firebase-7223e",
    storageBucket: "react-native-firebase-7223e.appspot.com",
    messagingSenderId: "657832364187",
    appId: "1:657832364187:web:2d52233b4945abc28b1e3e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
    firebase,
    db,
}