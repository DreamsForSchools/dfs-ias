import firebase from 'firebase/app'

// Public key/config for Project: Instructor-Assignment-Sorter
// const config = {
//   apiKey: "AIzaSyBEOLvTyc_33K8iuObEU7U-WiFV8O5U6Ik",
//   authDomain: "instructor-assignment-sorter.firebaseapp.com",
//   databaseURL: "https://instructor-assignment-sorter.firebaseio.com",
//   projectId: "instructor-assignment-sorter",
//   storageBucket: "instructor-assignment-sorter.appspot.com",
//   messagingSenderId: "309533915424",
//   appId: "1:309533915424:web:e29402a5265def9832bf45"
// };

// Public key/config for Project: DFS-IAS
const config = {
  apiKey: "AIzaSyD5xRlDFsIss2U9nR-tSriQIRwBzPmvQ5k",
  authDomain: "dfs-ias.firebaseapp.com",
  databaseURL: "https://dfs-ias.firebaseio.com",
  projectId: "dfs-ias",
  storageBucket: "dfs-ias.appspot.com",
  messagingSenderId: "44070275331",
  appId: "1:44070275331:web:a825361e868c7e63824136",
  measurementId: "G-0LQRWS0W4Z"
};

export default function initFirebase() {
  if (!firebase.apps.length) {
    console.log("Firebase Initiated");
    firebase.initializeApp(config);
  }
}
 
