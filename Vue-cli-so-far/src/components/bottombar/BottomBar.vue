<template>
    <div class="container-fluid bg-dark" id="footer">
        <div class="col-4">
                <div class="ocean" :style="{backgroundImage: 'url(../../assets/character/upper_body/${charId}.png)'}">
                    <div class="wave"></div>
                </div> 
        </div>
        <div class="col-8">
            <span id="playButtons">
                <i class="bi bi-skip-start-fill"> </i>
                <i class="bi bi-play-circle-fill"> </i>
                <i class="bi bi-skip-end-fill"> </i>
            </span>
            <div id="progressbar"></div>
        </div>

    </div>
    
</template>

<script>

export default {
    name: "BottomBar",
    props: {
        charId: {
            // supposed to retrieve from firebase..
            type: String,
            default: "1"
            },
        completedQuizzes: {
            type: Number,
            default: 0
        },
        username: {
            type: String,
            default: "user"
        },
    },
    // data() {
    //     return {
    //         user: {
    //             // supposed to retrieve from firebase...
    //             username: "user",
    //             charId: 1
    //         },

    //         completedQuizzes: 0
    //     }
    // }
}

</script>
<style scoped>
img {
    height:100px;
    width: 100px;
}
#footer {
    position: fixed;
    z-index: 1;
    /* top: 88vh; */
    bottom: 0;
    height: 7rem;
    border-top: rgb(46, 46, 46) 0.5px solid;
}

/* #upperBody {
    width: 300%;
    top: -10vw;
    position: absolute;
} */

#playButtons {
    position: relative;
    display: flex;
    margin-top: 0.5%;
    margin-left: 22vw;
    left: 45%;
}

#playButtons i{
    font-size: 250%;
    padding: 0 2%;
    color: white;
}

#progressbar {
    margin-left: 22vw;
    overflow: visible;
    z-index: 2;
    background-color: darkgrey;
    border-radius: 2px; 
    position: fixed;
    width: 72%;
    bottom: 3%;
    height: 1%;
}

#progressbar:after {
    content: '';
    display: block;
    background-color: white;
    width: 33%; /* to change this width accordingly using jquery*/
    height: 100%;
    border-radius: 2px; 
}

/* Wave Animation for Progress Bar */
.ocean, .wave {
    background-size: 70%;
    background-repeat: no-repeat;
}

.ocean {
    z-index: 1;
    position: absolute;
    left: 0.5vw;
    bottom: 0%;
    width: 14vw;
    height: 14vw;
    border: 3px solid white;
    box-shadow: 0 0 0 3px black;
    border-radius: 50%;
    overflow: hidden;
    background-position: 50%;
}

.wave {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0, 0, 0, 0.1); */
    border-radius: 50%;
    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
    background-attachment: fixed;
    background-position: 50%;
}

.wave:before, .wave:after {
    content: '';
    position: absolute;
    /* adjust below width and height for wave's height */
    /* half of icon will be width: 200% and height: 200% */
    width: 300%;
    height: 300%;
    top: 0;
    left: 50%;
    transform: translate(-50%, -75%);
    /* background-color: rgba(0, 0, 0, 0.5); */
}

.wave:before {
    border-radius: 45%;
    background: rgba (0, 0, 0, 0.1);
    animation: animate 5s linear infinite
}

.wave:after {
    border-radius: 40%;
    background: rgba(0, 0, 0, 0.5);
    animation: animate 10s linear infinite
}

@keyframes animate {
    0% {
        transform: translate(-50%, -75%) rotate(0deg);
    }
    0% {
        transform: translate(-50%, -75%) rotate(360deg);
    }
}
</style>

