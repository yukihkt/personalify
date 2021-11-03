// jQuery for homepage
$(document).ready(function(){
    // main button onclick
    $("#basic").click(function(){
        console.log("BASIC button clicked")
        $("#welcomeText").animate({
            height: '0px',
            width: '0px',
            opacity: "0"
        });
        $("#basic").animate({
            "margin-left": '20px',
            height: '1000px',
            width: '400px'
        });

        //change body style
        $(".grid__item").css({
            width:'100vw',
            "padding": "0px",
            height: "50vw"

        })
        $('body').css({height: "200vh"});
        $(".grid").css({
            position:"relative",
            "padding": "0px",
            "align-items": "flex-start",
            height: "40vw"

        });

        $("#personality").hide();
        $("#career").hide();
        $(".box__shadow").hide();
        $(".box__title").hide();
        $(".box__text").hide();
        // $(".box__content").fadeOut();
        $(".box__content").animate({
            "font-size": "40px"
        },1500);
        // show basic personality
        $("#basic-personality").css({
            height: "300vw"
        })
        $("#basic-personality").fadeIn(5000);
    });
});

$(document).ready(function(){
    // main button onclick
    console.log( "document loaded" );
    $("#personality").click(function(){
        console.log("BASIC button clicked")
        $("#welcomeText").animate({
            height: '0px',
            width: '0px',
            opacity: "0"
        });
        $("#basic").animate({
            height: '0px',
            width: '0px',
            opacity: "0"
        });
        $("#personality").animate({
            "margin-left": '20px',
            height: '1000px',
            width: '400px'
        });
        //change body style
        $(".grid__item").css({
            width:'100vw',
            "padding": "0px",
            // height: "10vw"
        })
        $('body').css({height: "200vh"});
        $(".grid").css({
            position:"relative",
            "padding": "0px",
            // height: "10vw"
        });
        $("#career").hide();
        $(".box__shadow").hide();
        $(".box__title").hide();
        $(".box__text").hide();
        $(".box__content").animate({
            "font-size": "40px"
        },1000);

    });
});

$(document).ready(function(){
    // main button onclick
    console.log( "document loaded" );
    $("#career").click(function(){
        console.log("BASIC button clicked")
        $("#welcomeText").animate({
            height: '0px',
            width: '0px',
            opacity: "0"
        },500);
        $("#basic").animate({
            height: '0px',
            width: '0px',
            opacity: "0"
        },500);
        $("#personality").animate({
            height: '0px',
            width: '0px',
            opacity: "0"
        },500);
        $("#career").animate({
            "margin-left": '20px',
            height: '1000px',
            width: '400px'
        });
        //change body style
        $(".grid__item").css({
            width:'100vw',
            "padding": "0px"
        })
        $('body').css({height: "200vh"});
        $(".grid").css({
            position:"relative",
            "padding": "0px"
        });

        $(".box__shadow").hide();
        $(".box__title").hide();
        $(".box__text").hide();
        $(".box__content").animate({
            "font-size": "40px"
        },1500);
    });
});

// DOM manipulation
