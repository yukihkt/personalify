<template>
  <div>
    <Sidebar />
    <BottomBar />
    
    <div
      style="margin-left: 15vw; margin-right: 0"
      class="row d-flex justify-content-center"
    >
      <div class="pt-4 px-5 text-start fs-2">
        About <span class="logo"> Personalify </span>
      </div>
      <div class="about mt-1 row d-flex mx-auto">
        <!-- replacement component -->
        <FlipCard
          v-for="(flip, title) in flippers"
          :key="title"
          :title="title"
          :desc="flip.desc"
          :desc2="flip.desc2"
          :listical="flip.listical"
          :cardImg="flip.cardImg"
        />
      </div>
    </div>
    <div
      style="margin-left: 15vw; margin-right: 0"
      class="row d-flex justify-content-center"
    >
      <div class="pt-4 px-5 text-start fs-2">
        About <span class="logo"> Our Team </span>
      </div>
      <div class="about mt-1 row d-flex mx-auto">
        <!-- replacement component -->
        <TeamFlipCard
          v-for="(flip, title) in names"
          :key="title"
          :title="title"
          :listical="flip.listical"
          :cardImg="flip.cardImg"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { checkDomain } from "../components/redirect";
import Sidebar from "../components/sidebar/Sidebar.vue";
import FlipCard from "../components/FlipCard.vue";
import TeamFlipCard from "../components/TeamFlipCard.vue";
import BottomBar from "../components/bottombar/BottomBar.vue";

export default {
  name: "About",
  // eslint-disable-next-line
  components: { Sidebar, FlipCard, TeamFlipCard, BottomBar },
  setup() {
    checkDomain();

    const flippers = {
      Music: {
        cardImg: "../assets/homepage/new/basicimg.svg",
        desc: "We derive the main features of the music you listen to, namely:",
        desc2: "from your main genre",
        listical: [
          "Danceability",
          "Energy",
          "Speechiness",
          "Acousticness",
          "Instrumentalness",
          "Liveness",
          "Valence",
          "Loudness",
          "Tempo",
        ],
      },
      Personality: {
        cardImg: "../assets/homepage/new/personalityimg.svg",
        desc: "We sort the main characteristics of the music you listen to into The Big 5 Personality traits:",
        desc2: "",
        listical: [
          "extroversion (outgoing/energetic vs. solitary/reserved)",
          "agreeableness (friendly/compassionate vs. critical/rational)",
          "openness to experience (inventive/curious vs. consistent/cautious)",
          "conscientiousness (efficient/organized vs. extravagant/careless)",
          "neuroticism (sensitive/nervous vs. resilient/confident)",
        ],
      },
      Career: {
        desc: "The result of your quizzes will determine your interests, strength, and preferences for your work environment. We will then categorise you into your most suitable career prospect, including:",
        desc2: "",
        listical: [
          "Architecture and engineering",
          "Arts, culture and entertainment",
          "Business management",
          "Law and public policy",
          "Community and social services",
          "Education",
          "Science and technology",
        ],
      },
    };
    

    const names = {
        'amanda': {
            cardImg: "../assets/about/amanda.svg",
            listical: [
              "Creative Intern", 
              "Front-end Developer",
            ]
        }, 
        'jennifer': {
            cardImg: "../assets/about/jennifer.svg",
            listical: [
              "Head of Global Sales", 
              "Front-end Developer",
              "#1 Sales Lead of 2021",
            ]
        }, 
        'ranon': {
            cardImg: "../assets/about/ranon.svg",
            listical: [
              "CTO",
              "Tech Lead",
              "Full-stack Developer",
            ]
        }, 
        'shreya': {
            cardImg: "../assets/about/shreya.svg",
            listical: [
              "Co-founder", 
              "Head of Human Resource", 
              "Front-end Developer"
            ]
        }, 
        'yuki': {
            cardImg: "../assets/about/yuki.svg",
            listical: [
              "Co-founder", 
              "Head of Creative", 
              "Full-stack Developer"
            ]
        }
    };

    return { flippers, names };
  },
};
</script>

<style scoped>
  .about {
    /* padding-left: 20vw; */
    padding-top: 1rem;
    display: flex;
    justify-content: space-evenly;
    align-items: baseline;
  }

  .logo {
    font-family: "Reem Kufi", sans-serif;
    color:#56BD66;
  }
</style>
