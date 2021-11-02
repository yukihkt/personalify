// jQuery
$(document).ready(function(){
    $("home-content").delay(5000).fadeIn(1000)
    // Onclick "Continue" button,
    $("#continue").click(function(){
        console.log("continue is clicked")
        // Hide Current Div
        $("#inputMain").hide()
        $("#heading2").show()

        // Show New Div

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