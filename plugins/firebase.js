import firebase from 'firebase'

const config = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  apiKey: 'AIzaSyAZR94Tf0wVcB8ugAkm9r5A6KV8er3v6FU',
  authDomain: 'cloud-critic.firebaseapp.com',
  databaseURL: 'https://cloud-critic.firebaseio.com',
  storageBucket: 'cloud-critic.appspot.com',
  messagingSenderId: '996956320277',
  appId: '1:996956320277:web:b2ca7c599f968607fe541c'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;
export const firestore = firebase.firestore();
export const storage = firebase.storage();
