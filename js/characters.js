var username = ""
var charId = 1
var imgSrc = "images/upperbody/" + charId + ".png"

var typed = new Typed('#typed0', {
    stringsElement: '#typed-strings0',
    typeSpeed: 15,
});

var typed = new Typed('#typed1', {
    stringsElement: '#typed-strings1',
    typeSpeed: 15,
    });

//EDIT THIS FUNCTION to stop the display  (moved to jquery)
// function display(){
//     document.getElementById("display").style="display:block";
//     document.getElementById("stop-display").style="display:none"
// }

// jQuery
$(document).ready(function(){
    $("#inputMain").delay(5000).fadeIn(1000)
    // Onclick "Continue" button,
    $("#continue").click(function(){
        console.log("continue is clicked")
        // Hide InputMain and Show CharMain
        $("#inputMain").hide() // hides input box
        $("#heading1").hide() // hides first heading
        $("#typed-strings0").hide() // hides first heading
        $("#typed-strings1").show() // hides first heading
        $("#heading2").show() // shows second heding
        $("#charMain").delay(2000).fadeIn(1000) // show character

        // Update Username
        username = $("#new_name").val()

        // Set imgSrc
        $("#charImg").attr("src", imgSrc)
    })

    $('#generate').click(function(){
        charId = randomGenerateNumber()
        console.log(charId)
        imgSrc = "images/upperbody/" + charId + ".png"
        $("#charImg").attr("src", imgSrc)
    })

    $('#updateUser').click(function(){
        console.log(username, charId, imgSrc)
        updateUser()
    })
})


// Onclick functions
function randomGenerateNumber() {
    let newId = charId
    while (newId == charId) {
        newId = Math.floor(Math.random() * (37 - 1) + 1) //min is 1, max is 37
    }
    charId = newId
    return newId
}

function updateUser() {
    app.$options.methods.getUser(username, charId, imgSrc)
}
