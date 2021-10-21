var username = ""
var charId = 1


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
    $("#inputMain").delay(8000).fadeIn(1000)
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
        $("#charImg").attr("src","images/upperbody/" + charId + ".png")
    })

    $('#generate').click(function(){
        charId = randomGenerateNumber()
        console.log(charId)
        $("#charImg").attr("src","images/upperbody/" + charId + ".png")
    })

    $('#updateUser').click(function(){
        console.log(charId)
        $("#charImg").attr("src","images/upperbody/" + charId + ".png")
        updateUser()
    })
})

// User Class
var User = class {
    constructor(username, charId) {
        this.username = ""
        this.charId = 1
    }

    // Getter
    get username() {
        return this.username
    }

    get charId() {
        return this.charId
    }

    get imgSrc() {
        return this.charId
    }

    // Method
    changeUsername(name) {
        this.username = name
    }

    changeCharId(id) {
        this.charId = id
    }
}

// Create new User object
const user = new User(username, charId)
charId = user.charId()


// Onclick functions
function randomGenerateNumber() {
    let newId = charId
    while (newId == charId) {
        newId = Math.floor(Math.random() * (37 - 1) + 1) //min is 1, max is 37
    }
    return newId
}

function updateUser() {
    user.changeUsername(username)
    user.changeCharId(charId)
}


