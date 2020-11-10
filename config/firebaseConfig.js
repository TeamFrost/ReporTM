import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAz_odPz6hIMfhlFRbLXfeLETbsP-6WKZI',
    authDomain: 'reportm-40f3e.firebaseapp.com',
    databaseURL: 'https://reportm-40f3e.firebaseio.com',
    projectId: 'reportm-40f3e',
    storageBucket: 'reportm-40f3e.appspot.com',
    messagingSenderId: '72027984488e',
    appId: '1:72027984488:android:584bb7d5a01b0ec8bc61dd',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };