<template>
  <div>
    <Sidebar />
    <BottomBar/>
    <div
      style="margin-left: 18rem; margin-right: 0"
      class="row d-flex justify-content-center"
    >
      <div class="col">
        <div class="pt-5 px-3 text-start fs-2">About Personalify</div>
        <div id="about" class="mt-1">
          <!-- replacement component -->
          <FlipCard
            v-for="(flip, title) in flippers"
            :key="title"
            :title="title"
            :desc="flip.desc"
            :desc2="flip.desc2"
            :listical="flip.listical"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkDomain } from "../components/redirect";
import Sidebar from "../components/sidebar/Sidebar.vue";
import FlipCard from "../components/FlipCard.vue";
import BottomBar from "../components/bottombar/BottomBar.vue";


export default {
  name: "About",
  // eslint-disable-next-line
  components: { Sidebar, FlipCard, BottomBar },
  setup() {
    checkDomain();

    const flippers = {
      Music: {
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
          "Key",
          "Mode",
        ],
      },
      Personality: {
        desc: "We then sort the main characteristics of the music you listen to into one of the Big 5 Personality, which consist of",
        desc2: "",
        listical: [
          "extroversion (outgoing/energetic vs. solitary/reserved)",
          "agreeableness (friendly/compassionate vs. critical/rational)",
          "openness [to experience] (inventive/curious vs. consistent/cautious)",
          "conscientiousness (efficient/organized vs. extravagant/careless)",
          "neuroticism (sensitive/nervous vs. resilient/confident)",
        ],
      },
      Career: {
        desc: "The result of your quizzes will determine your interests, strength, and the preferences of your work environment.We will then categories you into your most suitable career prospect using the results of your quizzes, alongside your Music and Personality analysis. The career prospects we can suggest includes",
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

    return { flippers };
  },
};
</script>

<style scoped>
#about {
  /* padding-left: 20vw; */
  padding-top: 5vw;
  display: flex;
  justify-content: space-around;
  font-family: "Reem Kufi", sans-serif;
  align-items: baseline;
}
</style>
