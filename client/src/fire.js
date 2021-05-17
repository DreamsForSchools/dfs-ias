
// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js"></script>
//
// <!-- TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries -->
//
//     <script>
//         // Your web app's Firebase configuration
//         var firebaseConfig = {
//         apiKey: "AIzaSyBxB3JDTCiSsnRUw98IhwY1mEKD4KgMixE",
//         authDomain: "dfs-ias-71e36.firebaseapp.com",
//         projectId: "dfs-ias-71e36",
//         storageBucket: "dfs-ias-71e36.appspot.com",
//         messagingSenderId: "579295975229",
//         appId: "1:579295975229:web:61f1c7be7f39ffecf39754"
//     };
//         // Initialize Firebase
//         firebase.initializeApp(firebaseConfig);
//     </script>


import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyBxB3JDTCiSsnRUw98IhwY1mEKD4KgMixE",
    authDomain: "dfs-ias-71e36.firebaseapp.com",
    databaseURL: "https://dfs-ias-71e36-default-rtdb.firebaseio.com",
    projectId: "dfs-ias-71e36",
    storageBucket: "dfs-ias-71e36.appspot.com",
    messagingSenderId: "579295975229",
    appId: "1:579295975229:web:61f1c7be7f39ffecf39754"
};



export const createToken = async () => {
    const user = fire.auth().currentUser;
    const token = user && (await user.getIdToken());
    const payloadHeader = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    return payloadHeader;
}

try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack);
    }
}



const fire = firebase;
export default fire;