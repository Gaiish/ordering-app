import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import FIREBASE_CONFIG from './firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

export default firebase;
