var firebase = require('firebase');

const firebaseConfig = {
  apiKey: "AIzaSyAfphyJEcTo5w5EaJQeKHQyimslja0EUVA",
  authDomain: "ferns-bingo.firebaseapp.com",
  projectId: "ferns-bingo",
  storageBucket: "ferns-bingo.appspot.com",
  messagingSenderId: "575774018700",
  appId: "1:575774018700:web:2554b18bd17e2c8724bfa9",
  measurementId: "G-F2QRESTMX0"
};

export var app = firebase.default.initializeApp(firebaseConfig);
