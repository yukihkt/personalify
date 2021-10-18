// Vuefire
import Vue from 'vue'
import { rtdbPlugin } from 'vuefire'
Vue.use(rtdbPlugin)

// Get a RTDB instance
import firebase from 'firebase/app'
import 'firebase/database'

export const db = firebase
  .initializeApp({ databaseURL: 'MY PROJECT URL' })
  .database()

// From Firebase Documentation:
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB2I91p2rPpvklVT6CQW7pXloSzWfAkvZs",
//   authDomain: "wad2-941f5.firebaseapp.com",
//   databaseURL: "https://wad2-941f5-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "wad2-941f5",
//   storageBucket: "wad2-941f5.appspot.com",
//   messagingSenderId: "1076286748821",
//   appId: "1:1076286748821:web:17540fd85311c786f5439c",
//   measurementId: "G-BG66NLPXPB"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
