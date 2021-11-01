const app = Vue.createApp({
    data() {
        return {
            navEl: {
                "home": {
                    // Bootstrap Icon
                    iconClass: "bi bi-house-fill",
                    link: "testhomepage.html",
                    title: "Home",
                    isActive: true,
                },
                "about": {
                    iconClass: "bi bi-info-circle-fill",
                    link: "about.html",
                    title: "About",
                    isActive: false
                },
                "report": {
                    iconClass: "bi bi-file-earmark-person",
                    link: "report.html",
                    title: "Report",
                    isActive: false
                },
                "logout": {
                    iconClass: "bi bi-box-arrow-left",
                    link: "connect.html",
                    title: "Logout",
                    isActive: false
                }
            },

            homeEl: {
                "basic": {
                    title: "Basic Personality Test",
                    level: 1,
                    cardImg: "images/homepage/basic_personality.svg",
                    link: "basicpersonalityloading.html",
                    desc: "offers Personality Analysis based on your music taste",
                    color: "#78E185"
                },
                "personality": {
                    title: "Personality Quiz",
                    level: 2,
                    cardImg: "images/homepage/personality_quiz_done.svg",
                    link: "personalityquiz.html",
                    desc: "offers further insights into which of the big 5 personalities you are",
                    color: "#FF4B40"
                },
                "career": {
                    title: "Career Quiz",
                    level: 3,
                    cardImg: "images/homepage/career_quiz_done.svg",
                    link: "careerquiz.html",
                    desc: "offers guidance on your suitable career prospects",
                    color: "#37C1FF"
                },
            },

            user: {
                // supposed to retrieve from firebase...
                username: "test",
                charId: 1
            },

            completedQuizzes: 0
        } 
    }

    // methods: {
    //     getUser(username, charId, imgSrc) {
    //         this.username = username
    //         this.charId = charId
    //         this.imgSrc = imgSrc
    //     }
    // }
});

// Side Nav Bar Component
app.component('nav-bar', {
    props: ['elements', 'user'],
    template: `
        <nav class="nav flex-column navbar-dark bg-dark" id="navbar">
            <div class="d-flex align-self-center" id="header">
                <div id="cropped">
                    <img :src="'images/upperbody/'+ user.charId +'.png'" id="icon"> 
                </div>
                <h2 id="logo" class="text-white" style="font-size: 1.8vw; padding: 2vw 0 0 1vw">Personalify</h2>
            </div>
            <div v-for="nav in elements" class="d-flex justify-content-start align-items-center" id="navlinks">
                <i :class="nav.iconClass"> </i>
                <a class="nav-link" :class="nav.isActive ? 'active fw-bold' : ''" :href="nav.link">
                    {{nav.title}}
                </a>
            </div>
        </nav>
    `
})

app.component("header", {
    template: 
    `
    <div id='heading'>
        <span id='heading1'>Hello</span>
        <br>
        <span id='heading2'>See current quiz report or take a new one... </span>
        <br>
        <span id='heading3'>...do whatever you want I guess</span>
    </div>
    `
})

app.component('home-content', {
    props: ['elements'],
    template: `
    <div id="gridCards" class="container grid" v-for="el in elements">
        <a class="grid__item grid__item--noclick" :href="el.link">
            <div class="box p-0">
                <div class="box__shadow"></div>
                <img class="box__img" id='cardImg' :src="el.cardImg">
                <h3 class="box__title">
                    <span class="box__title-inner" data-hover="Level">
                        Level {{el.level}}
                    </span>
                </h3>
                <h4 class="box__text">
                    <span class="box__text-inner box__text-inner--rotated2 box__text-inner--reverse">
                        Level {{el.level}}
                    </span>
                </h4>
                <p class="box__content">
                    <strong>{{el.title}}</strong> 
                    {{el.dec}}
                </p>
            </div>
        </a>
    </div>
    `
})

// Bottom Progress Bar Component
app.component('progress-bar', {
    props: ['elements', 'progress', 'user'],
    template: `
        <div class="container-fluid bg-dark" id="footer">
            <div class="wave"></div>
            <div class="col-4">
                <div class="ocean">
                    <img :src="'images/upperbody/'+ user.charId +'.png'" id="upperBody">
                </div> 
            </div
            <div class="col-8">
                <div id="progressbar">
                </div>
            </div>
        </div>
    `
})

app.mount('#app')