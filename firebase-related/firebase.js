// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyB2I91p2rPpvklVT6CQW7pXloSzWfAkvZs",
authDomain: "wad2-941f5.firebaseapp.com",
databaseURL: "https://wad2-941f5-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId: "wad2-941f5",
storageBucket: "wad2-941f5.appspot.com",
messagingSenderId: "1076286748821",
appId: "1:1076286748821:web:17540fd85311c786f5439c",
measurementId: "G-BG66NLPXPB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a database reference to our personalities
const db = getDatabase();
const dbref = ref(getDatabase());
console.log(dbref)

get(child(dbref, 'quizzes/personality_quiz')).then((snapshot)=>{
    if (snapshot.exists()){
        console.log(snapshot.val());

        var title = snapshot.val().title
        var agreeablenessArr = snapshot.val().questions.agreeableness
        var conscientiousnessArr = snapshot.val().questions.conscientiousness
        var extroversionArr = snapshot.val().questions.extroversion
        var neuroticismArr = snapshot.val().questions.neuroticism
        var opennessArr = snapshot.val().questions.openness
        console.log(agreeablenessArr);
        console.log(neuroticismArr);
    }   
    else {
        console.log("No data available");
    }
})
