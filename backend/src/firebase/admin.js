const firebase = require('firebase-admin');
const credentials = require('./credentials.json');

firebase.initializeApp({
   credential: firebase.credential.cert(credentials),
   databaseURL: 'camera-rental-project.firebaseapp.com',
});

module.exports = firebase;
