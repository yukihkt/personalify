// the code is written in a way that the user can only choose 1 option and can change after choosing the option so they have to choose carefully before proceeding //
var count = 0
let openness= "low"
let conscientiousness= "low"
let extroversion= "low"
let agreeable= "low"
let neuroticism= "low"

if(count < 15){
    let o_score = 0
    let c_score = 0
    let e_score = 0
    let a_score = 0
    let n_score = 0


    function o_check(chosen){
        console.log(chosen.innerText)
        if (chosen.innerText == "That's Me"){
            o_score++
        }
        if (o_score > 1){
            openness = "high"
        }
        count++
        console.log(o_score)
        console.log(openness)
    }

    function c_check(chosen){
        console.log(chosen.innerText)
        if (chosen.innerText == "That's Me"){
            c_score++
        }
        if (c_score > 1){
            conscientiousness="high"
        }
        count++
        console.log(c_score)
    }

    function e_check(chosen){
        console.log(chosen.innerText)
        if (chosen.innerText == "That's Me"){
            e_score++
        }
        if (e_score > 1){
            extroversion="high"
        }
        count++
        console.log(e_score)
    }

    function a_check(chosen){
        console.log(chosen.innerText)
        if (chosen.innerText == "That's Me"){
            a_score++
        }   
        if (a_score > 1){
            agreeable="high"
        }
        count++
        console.log(a_score)
    }

    function n_check(chosen){
        console.log(chosen.innerText)
        if (chosen.innerText == "That's Me"){
            n_score++
        }
        if (n_score > 1){
            neuroticism="high"
        }
        count++
        console.log(count)
        console.log(n_score)
    }
}



