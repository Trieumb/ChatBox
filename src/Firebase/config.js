import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBDbPRKFZq8ocVskKPWdPXZYTm-PXA8QLo',
  authDomain: 'chat-app-61eef.firebaseapp.com',
  projectId: 'chat-app-61eef',
  storageBucket: 'chat-app-61eef.appspot.com',
  messagingSenderId: '568093722117',
  appId: '1:568093722117:web:6a3f97582344598ac5fe6c',
  measurementId: 'G-881GCCRY1S',
};

// Initialize Firebase
firebase.initializeApp (firebaseConfig);
firebase.analytics ();

const auth = firebase.auth ();
const db = firebase.firestore ();

auth.useEmulator ('http://localhost:9099');
if (window.location.hostname === 'localhost') {
  db.useEmulator ('localhost', '8080');
}

export {auth, db};
export default firebase;
