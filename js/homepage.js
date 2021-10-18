function changeHeading() {
    if (personality_quiz == "Completed" && career_quiz == "Completed") {
        document.getElementById("heading1") = "Congratulations on completing all three stages!"
        document.getElementById("heading2") = ""
        document.getElementById("heading3") = ""
    }
}

function changeProgressBar() {
    if (personality_quiz == "Completed" && career_quiz == "Incomplete") {
        document.getElementById("white-1st").id = "white-2nd"
        document.getElementById("grey-1st").id = "grey-2nd"
    } 
    else if  (personality_quiz == "incomplete" && career_quiz == "Completed") {
        document.getElementById("white-1st").id = "white-2nd"
        document.getElementById("grey-1st").id = "grey-2nd"
    }      
    else if (personality_quiz == "Completed" && career_quiz == "Completed") {
        document.getElementById("white-2nd").id = "white-3rd"
        document.getElementById("grey-2nd").id = "grey-3rd"
    }
}

function changeImgColor() {
    if (personality_quiz == "Completed") {
        document.getElementById('image2').getAttributeNode('href').value = "personality_quiz_done.svg";
    }
    if (career_quiz == "Completed") {
        document.getElementById('image3').getAttributeNode('href').value = "career_quiz_done.svg";
    }
}
