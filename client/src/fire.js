import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA9m_pP2e-P-qZcFHBUtSTeLmQp582ogfQ",
    authDomain: "dfs-ias-312603.firebaseapp.com",
    projectId: "dfs-ias-312603",
    storageBucket: "dfs-ias-312603.appspot.com",
    messagingSenderId: "56681424437",
    appId: "1:56681424437:web:9cc1069a076a21a4b7337c",
    measurementId: "G-02CXKX6K6D"
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