const app = Vue.createApp({
    data() {
        return {
            navEl: {
                "home": {
                    // Bootstrap Icon
                    iconClass: "bi bi-house-fill",
                    link: "testhomepage.html",
                    title: "Home",
                    isActive: true
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
                    color: "#78E185",
                    id: "basic",
                    isCompleted: true,
                    imgId: "basicimg"
                },
                "personality": {
                    title: "Personality Quiz",
                    level: 2,
                    cardImg: "images/homepage/personality_quiz_done.svg",
                    link: "personalityquiz.html",
                    desc: "offers further insights into which of the big 5 personalities you are",
                    color: "#FF4B40",
                    id: "personality",
                    isCompleted: false,
                    imgId: "personalityimg"
                },
                "career": {
                    title: "Career Quiz",
                    level: 3,
                    cardImg: "images/homepage/career_quiz_done.svg",
                    link: "careerquiz.html",
                    desc: "offers guidance on your suitable career prospects",
                    color: "#37C1FF",
                    id: "career",
                    isCompleted: false,
                    imgId: "careerimg"
                },
            },

            user: {
                // supposed to retrieve from firebase...
                username: "user",
                charId: 1
            },

            completedQuizzes: 0
        } 
    },

    methods: {
        countQuiz() {
            let count = 0
            for(elem in this.homeEl) {
                let element = this.homeEl[elem]
                if (element.isCompleted == true) {
                    count++
                }
            }
            this.completedQuizzes = count
            // console.log(count)
        }

    //     getUser(username, charId, imgSrc) {
    //         this.username = username
    //         this.charId = charId
    //         this.imgSrc = imgSrc
    //     }

    }
});

// Side Nav Bar Component
app.component('nav-bar', {
    props: ['elements', 'user'],
    template: `
        <nav class="nav flex-column navbar-dark bg-dark px-1" id="navbar">
            <a class="text-center" id="header" href="">
                <h2 id="logo" class="lightgreen pt-3" style="font-size: 2vw;">
                    Personalify
                </h2>
            </a>
            <div v-for="nav in elements" class="d-flex justify-content-center align-items-center" id="navlinks">
                <a class="nav-link" :class="nav.isActive ? 'active activeNavLink' : ''" :href="nav.link">
                    <i :class="nav.iconClass" class="pe-2 ps-0"> </i>
                    {{nav.title}}
                </a>
            </div>
        </nav>
    `
})

app.component('home-content', {
    props: ['homelinks', 'elements', 'user'],
    template: `
    
        <div>
            <div class="text-white" id="welcomeText">
                <h1 class="fw-bold">Hello, {{user.username}}</h1>
                <h4 class="ps-3">See current quiz report or take a new one... </h4>
                <h4 class="ps-3 fst-italic">...do whatever you want I guess</h4>
            </div>
            <div class='grid content'>
                <div id="gridCards" v-for="el in homelinks">
                    <a class="grid__item grid__item--noclick" :id="el.id" :class="el.isCompleted ? 'quizActive' : 'quizInActive'">
                        <div class="box p-0">
                            <div class="box__shadow">
                            </div>
                            <img class="box__img" id='el.imgId' :src="el.cardImg">
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
                            <p id='box__content' class="box__content">
                                <strong>{{el.title}}</strong> 
                                {{el.dec}}
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    `
})

// Bottom Progress Bar Component
app.component('progress-bar', {
    props: ['elements', 'progress', 'user'],
    template: `
        <div class="container-fluid bg-dark" id="footer">
            <div class="col-4">
                <div class="ocean" :style="{backgroundImage: 'url(images/upperbody/' + user.charId + '.png)'}">
                    <div class="wave" :style="{backgroundImage: 'url(images/upperbody/' + user.charId + '.png)'}">
                    </div>
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
    `
})

app.mount('#app')