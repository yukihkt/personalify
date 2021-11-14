const app = Vue.createApp({
    data() {
        return {
            navEl: {
                "home": {
                    // Bootstrap Icon
                    id: "home",
                    iconClass: "bi bi-house-fill",
                    link: "testhomepage.html",
                    title: "Home",
                    isActive: true
                },
                "about": {
                    id: "about",
                    iconClass: "bi bi-info-circle-fill",
                    link: "about.html",
                    title: "About",
                    isActive: false
                },
                "report": {
                    id: "report",
                    iconClass: "bi bi-file-earmark-person",
                    link: "report.html",
                    title: "Report",
                    isActive: false
                },
                "logout": {
                    id: "logout",
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
                    imgId: "basicimg",
                    show: false,
                    full_desc: `We derive the main characteristics of the music you listen to, namely 
                        <ul>
                            <li>Duration</li>
                            <li>Acousticness</li>
                            <li>Danceability</li>
                            <li>Instrumentalness</li>
                            <li>Energy</li>
                            <li>Liveness</li>
                            <li>Loudness</li>
                            <li>Speechiness</li>
                            <li>Valence</li>
                            <li>Tempo</li>
                        </ul>
                        from your top music genres.`
                },
                "personality": {
                    title: "Personality Quiz",
                    level: 2,
                    cardImg: "images/homepage/personality_quiz.svg",
                    link: "personalityquiz.html",
                    desc: "offers further insights into which of the big 5 personalities you are",
                    color: "#FF4B40",
                    id: "personality",
                    isCompleted: false,
                    imgId: "personalityimg",
                    show: false,
                    full_desc: `We then sort the main characteristics of the music you listen to into one of the <strong>Big 5 Personality</strong>, which consists of
                        <ul>
                            <li>extraversion (outgoing/energetic vs. solitary/reserved)</li>
                            <li>agreeableness (friendly/compassionate vs. critical/rational)</li>
                            <li>openness to experience (inventive/curious vs. consistent/cautious)</li>
                            <li>conscientiousness (efficient/organized vs. extravagant/careless)</li>
                            <li>neuroticism (sensitive/nervous vs. resilient/confident)</li>
                        </ul>`
                },
                "career": {
                    title: "Career Quiz",
                    level: 3,
                    cardImg: "images/homepage/career_quiz.svg",
                    link: "careerquiz.html",
                    desc: "offers guidance on your suitable career prospects",
                    color: "#37C1FF",
                    id: "career",
                    isCompleted: false,
                    imgId: "careerimg",
                    show: false,
                    full_desc: `The result of your quizzes will determine your interests, strength, and the preferences of your work environment.We will then categories you into your most suitable career prospect using the results of your quizzes, alongside your Music and Personality analysis. The career prospects we can suggest includes
                        <ul>
                            <li>Architecture and engineering</li>
                            <li>Arts, culture and entertainment</li>
                            <li>Business management</li>
                            <li>Law and public policy</li>
                            <li>Community and social services</li>
                            <li>Education</li>
                            <li>Science and technology</li>
                        </ul>`
                },
            },

            user: {
                // supposed to retrieve from firebase...
                username: "user",
                charId: 1
            },

            completedQuizzes: 0,

            names: {
                'amanda': {
                    role: "Front-end developer"
                }, 
                'jennifer': {
                    role: "Front-end developer"
                }, 
                'ranon': {
                    role: "Full stack developer"
                }, 
                'shreya': {
                    role: "Full stack developer"
                }, 
                'yuki': {
                    role: "Full stack developer"
                }
            }
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
        },
        
        changeActive(pageEl) {
            console.log("===changeActive()===")
            for (el in this.navEl) {
                this.navEl[el].isActive = false
            }
            this.navEl[pageEl].isActive = true
            // if (obj == "about") {
            //     this.navEl["homepage"].isActive = false
            //     this.navEl["about"].isActive = true
            //     this.navEl["report"].isActive = false
            //     this.navEl["logout"].isActive = false
            // }
            // else if (obj == "homepage") {
            //     this.navEl["homepage"].isActive = true
            //     this.navEl["about"].isActive = false
            //     this.navEl["report"].isActive = false
            //     this.navEl["logout"].isActive = false
            // }
            // else if (obj == "report") {
            //     this.navEl["homepage"].isActive = false
            //     this.navEl["about"].isActive = false
            //     this.navEl["report"].isActive = true
            //     this.navEl["logout"].isActive = false
            // }
            // else if (obj == "logout") {
            //     this.navEl["homepage"].isActive = false
            //     this.navEl["about"].isActive = false
            //     this.navEl["report"].isActive = false
            //     this.navEl["logout"].isActive = true
            // }
            
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
                <a class="nav-link" :class="nav.isActive ? 'active activeNavLink' : ''" :href='nav.link'>
                    <i :class="nav.iconClass" class="pe-2 ps-0"> </i>
                    {{nav.title}}
                </a>
            </div>
        </nav>
    `
})

app.component('home-content', {
    props: ['homelinks', 'elements', 'user'],
    template: /*html*/`
    
        <div>
            <div class="text-white" id="welcomeText">
                <h1 class="fw-bold">Hello, {{user.username}}</h1>
                <h4 class="ps-3">See current quiz report or take a new one... </h4>
                <h4 class="ps-3 fst-italic">...do whatever you want I guess</h4>
            </div>
            <div class='grid content'>
                <div v-on:click='el.show = !el.show' v-on:click='el.isCompleted = !el.isCompleted' id="gridCards" v-for="el in homelinks">
                    <a class="grid__item grid__item--noclick" :id="el.id" :class="el.isCompleted ? 'quizActive' : 'quizInActive'">
                        <div class="box p-0">
                            <div class="box__shadow">
                            </div>
                            <img class="box__img" :id='el.imgId' :src="el.cardImg">
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
                                {{el.desc}}
                            </p>
                        </div>
                    </a>
                </div>
            </div>
            <div v-show="homelinks['basic'].show == true" id='basic-personality'>
                <div id='box'>
                    <div id='info'>
                        <div id='chart1'>
                            <canvas id="musictraitschart"></canvas>
                        </div>
                        <div id='chart2'>
                            <canvas id="personalitytraits"></canvas>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div v-show="homelinks['personality'].show == true" id='personality-quiz'>
                <div id='box'>
                    <div id='info'>
                        ADD QUIZ HERE
                    </div>
                </div>
            </div>
            <div v-show="homelinks['career'].show == true" id='career-quiz'>
                <div id='box'>
                    <div id='info'>
                        ADD QUIZ HERE
                    </div>
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