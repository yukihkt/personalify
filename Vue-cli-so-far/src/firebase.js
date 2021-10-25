import { initializeApp } from "firebase/app";
// eslint-disable-next-line
import { getDatabase, ref, child, get } from "firebase/database";

let firebaseConfig = {
  apiKey: "AIzaSyB2I91p2rPpvklVT6CQW7pXloSzWfAkvZs",
  authDomain: "wad2-941f5.firebaseapp.com",
  databaseURL:
    "https://wad2-941f5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wad2-941f5",
  storageBucket: "wad2-941f5.appspot.com",
  messagingSenderId: "1076286748821",
  appId: "1:1076286748821:web:17540fd85311c786f5439c",
  measurementId: "G-BG66NLPXPB",
};

// eslint-disable-next-line
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(db);

export const getPersonalities = async () => {
  try {
    const snapshot = await get(child(dbRef, "personalities"));
    if (snapshot.exists()) return snapshot.val();
    else return "Nothing here";
  } catch (err) {
    return "Error: " + err;
  }
};
