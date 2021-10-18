var username = ""
var charId = 1

// jQuery
$(document).ready(function(){
    // Onclick "Continue" button,
    $("#continue").click(function(){
        console.log("continue is clicked")
        // Hide InputMain and Show CharMain
        $("#inputMain").hide()
        $("#charMain").show()

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


