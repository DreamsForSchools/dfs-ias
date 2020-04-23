import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyB1T2X2CL_Bl4ulaksrby5i-RJ6edIkyHw",
    authDomain: "dreamsforschools-ias.firebaseapp.com",
    databaseURL: "https://dreamsforschools-ias.firebaseio.com",
    projectId: "dreamsforschools-ias",
    storageBucket: "dreamsforschools-ias.appspot.com",
    messagingSenderId: "382060190581",
    appId: "1:382060190581:web:f6b0924fd60a445884d13c",
    measurementId: "G-G0NHPPBQHJ"
  };
  // Initialize Firebase
var fire = firebase.initializeApp(firebaseConfig);
export default fire;