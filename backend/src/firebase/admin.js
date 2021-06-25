const firebase = require('firebase-admin');
const credentials = require('./credentials.json');

firebase.initializeApp({
   credential: firebase.credential.cert(credentials),
   databaseURL: process.env.FIREBASE_ADMIN_URL,
});

module.exports = firebase;
