// jQuery for homepage
$(document).ready(function(){
    // main button onclick
    console.log( "document loaded" );
    $("#basic").click(function(){
        console.log("BASIC button clicked")
        $("#welcomeText").animate({
            height: '0px',
            width: '0px',
            opacity: "0"
        })

        $("#basic").animate({
            "margin": '0rem',
            height: '100vh',
            width: '30vw',
        })

        $("#basic:hover").css({
            "filter": "none"
        })

        $(".grid__item").css({
            width:'100vw'
        })

        // Hide rest of elements
        $("#personality").hide();
        $("#career").hide();
        $(".box__shadow").hide();
        $(".box__title").hide();
        $(".box__text").hide();
        // $(".box__content").fadeOut();

        // Move box
        $(".box__content").animate({
            "font-size": "3vw",
            "margin-top": "0.5vw",
        },1500);
        // $("#basic .box__content").hide().fadeIn()

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
        $(".grid__item").css({
            width:'100vw'
        })
        $("#career").hide();
        $(".box__shadow").hide();
        $(".box__title").hide();
        $(".box__text").hide();
        // $(".box__content").fadeOut();
        $(".box__content").animate({
            "font-size": "40px"
        },1000);
        // $("#basic .box__content").hide().fadeIn()

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
        $(".grid__item").css({
            width:'100vw'
        })
        $(".box__shadow").hide();
        $(".box__title").hide();
        $(".box__text").hide();
        // $(".box__content").fadeOut();
        $(".box__content").animate({
            "font-size": "40px"
        },1500);
        // $("#basic .box__content").hide().fadeIn()

    });
});