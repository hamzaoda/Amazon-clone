import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDW4Go1uhVUVpNr2lEieh-es7bPnlQDU6k",
    authDomain: "clone-da32c.firebaseapp.com",
    projectId: "clone-da32c",
    storageBucket: "clone-da32c.appspot.com",
    messagingSenderId: "1060072603739",
    appId: "1:1060072603739:web:a5c926d136dcc57e197f7e"
  };

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig):
  firebase.app();
  const db = app.firestore();
  export default db;