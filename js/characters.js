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

    // Method
    changeUsername(name) {
        this.username = name
    }

    changeCharId(id) {
        this.charId = id
    }
}

var username = ""
var charId = 1
const user = new User(username, charId)
var charSrc = "images/upperbody/" + charId + ".png"

function randomGenerateNumber() {
    newId = charId
    while (newId == charId) {
        newId = Math.floor(Math.random(1,37))
    }
    charId = newId
}

function updateUser() {
    user.changeUsername(this.username)
    user.changeCharId(this.charId)
}

var typed = new Typed('#typed', {
    stringsElement: '#typed-strings',
    backSpeed: 40,
    typeSpeed: 40
});

$(document).ready(function(){
    // Onclick "Continue" button,
    $("#continue").click(function(){
        console.log("continue is clicked")
        // Hide InputMain and Show CharMain
        $("#inputMain").hide()
        $("#charMain").show()
        // Set imgSrc
        $("#charImg").attr("src","images/upperbody/"+charId+".png")
    })
})
