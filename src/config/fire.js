/*
  This is the firebase credentials for DFS-IAS
*/

import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyD5xRlDFsIss2U9nR-tSriQIRwBzPmvQ5k",
  authDomain: "dfs-ias.firebaseapp.com",
  databaseURL: "https://dfs-ias.firebaseio.com",
  projectId: "dfs-ias",
  storageBucket: "dfs-ias.appspot.com",
  messagingSenderId: "44070275331",
  appId: "1:44070275331:web:a825361e868c7e63824136"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;