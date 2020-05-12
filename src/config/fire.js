import firebase from 'firebase';

// var firebaseConfig = {
//     apiKey: "AIzaSyBrNHc8l7NhoyVLiQIA61oJ_7IIa_nBeNQ",
//     authDomain: "dfs-ias-test.firebaseapp.com",
//     databaseURL: "https://dfs-ias-test.firebaseio.com",
//     projectId: "dfs-ias-test",
//     storageBucket: "dfs-ias-test.appspot.com",
//     messagingSenderId: "348943047435",
//     appId: "1:348943047435:web:fb5e92c3b861967065200e"
//   };

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