// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const dotenv = require("dotenv");
dotenv.config();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.firebaseApiKey,
  authDomain: process.env.firebaseAuthDomain,
  projectId: process.env.firebaseProjectId,
  storageBucket: process.env.firebaseStorageBucket,
  messagingSenderId: process.env.firebaseMessagingSenderId,
  appId: process.env.firebaseAppId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

module.exports = app;