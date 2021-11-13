<template>
  <div id="mainBody">
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
      <div class="pt-2 px-5 text-start fs-2">
        About <span class="logo"> Our Team </span>
      </div>
      <div class="about mt-1 row d-flex mx-auto">
        <!-- replacement component, also using :title for the img now -->
        <TeamFlipCard
          v-for="(flip, title) in names"
          :key="title"
          :title="title"
          :listical="flip.listical"
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
        // pushing in the full relative link is bad for the require statements and this way also looks nicer imo :3
        cardImg: "basicimg",
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
        cardImg: "personalityimg",
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
        cardImg: "careerimg",
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

    // ended up using :title as for the img name because lazy :3
    const names = {
      amanda: {
        listical: ["Creative Intern", "Front-end Developer"],
      },
      jennifer: {
        listical: [
          "Head of Global Sales",
          "Front-end Developer",
          "#1 Sales Lead of 2021",
        ],
      },
      ranon: {
        listical: ["CTO", "Tech Lead", "Full-stack Developer"],
      },
      shreya: {
        listical: [
          "Co-founder",
          "Head of Human Resource",
          "Front-end Developer",
        ],
      },
      yuki: {
        listical: ["Co-founder", "Head of Creative", "Full-stack Developer"],
      },
    };

    return { flippers, names };
  },
};
</script>

<style scoped>
#mainBody {
  overflow-y: scroll;
  height: 90vh;
}

.about {
  /* padding-left: 20vw; */
  padding-top: 1rem;
  display: flex;
  justify-content: space-evenly;
  align-items: baseline;
}

.logo {
  font-family: "Reem Kufi", sans-serif;
  color: #56bd66;
}
</style>
