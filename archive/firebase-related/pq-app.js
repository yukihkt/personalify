// Get a database reference to our posts
const db = getDatabase();
const ref = db.ref('server/saving-data/fireblog/posts');

// Attach an asynchronous callback to read the data at our posts reference
ref.on('value', (snapshot) => {
    console.log(snapshot.val());
}, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
}); 

// STILL DEBUGGING!!!!! Please do not EDIT! Uploaded just so you guys can track progress of the team!
// the code is written in a way that the user can only choose 1 option and can change after choosing the option so they have to choose carefully before proceeding //

let o_score = 0
let c_score = 0
let e_score = 0
let a_score = 0
let n_score = 0
let count = 0

function o_check(chosen){
    console.log(chosen.innerText)
    if (chosen.innerText == "That's Me"){
        o_score++
    }
    count++
    console.log(o_score)
}

function c_check(chosen){
    console.log(chosen.innerText)
    if (chosen.innerText == "That's Me"){
        c_score++
    }
    count++
    console.log(c_score)
}

function e_check(chosen){
    console.log(chosen.innerText)
    if (chosen.innerText == "That's Me"){
        e_score++
    }
    count++
    console.log(e_score)
}

function a_check(chosen){
    console.log(chosen.innerText)
    if (chosen.innerText == "That's Me"){
        a_score++
    }
    count++
    console.log(a_score)
}

function n_check(chosen){
    console.log(chosen.innerText)
    if (chosen.innerText == "That's Me"){
        n_score++
    }
    count++
    console.log(count)
    console.log(n_score)
}

let openness= "high"
let conscientiousness= "high"
let extroversion= "high"
let agreeable= "high"
let neuroticism= "high"
if (count == 15){
    if (o_score < 2){
        openness="low"
    }
    if (c_score < 2){
        conscientiousness="low"
    }
    if (e_score < 2){
        extroversion="low"
    }
    if (a_score < 2){
        agreeable="low"
    }
    if (n_score < 2){
        neuroticism="low"
    }

    const ref = db.ref()

    firebase.database().ref('openness')
    console.log(firebase.database().ref('openness'))
    firebase.database().ref('conscientiousness').set(conscientiousness)
    firebase.database().ref('extroversion').set(extroversion)
    firebase.database().ref('agreeable').set(agreeable)
    firebase.database().ref('neuroticism').set(neuroticism)

}