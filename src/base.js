import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB5FAWg5QQkfaTA4HyTtx7B9BCS6RrW698",
    authDomain: "catch-of-the-day-thibault-jp.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-thibault-jp.firebaseio.com"
  });
  
  const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp }; // named export
export default base; // default export