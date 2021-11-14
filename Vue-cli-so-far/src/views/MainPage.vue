<template>
  <!-- need to add the stuff jen has done in the grp repo -->
  <div>
    <Sidebar />
    <BottomBar />

    <div>
      <div
        style="margin-left: 17vw; margin-right: 0"
        class="row d-flex justify-content-center"
      >
        <div class="col">
            <MainComponent
              :userNick="nickname"
              @show-component="changeComponent"
              @click="shiftView"
            />
          <button
            @click="hideComponent"
            class="btn btn-outline-light mt-4"
            v-if="showBackBtn"
          >
            See Less
          </button>
          <!-- caching recent progress, so if user wants to switch off for a bit -->
          <!-- they don't lose their progress -->
          <keep-alive>
            <component :is="currentComponent" style="margin-bottom: 8rem" />
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { checkDomain } from "../components/redirect";
import Sidebar from "../components/sidebar/Sidebar.vue";
import MainComponent from "../components/main/MainComponent.vue";
import MusicBasic from "../components/main/MusicBasic.vue";
import PQuizComponent from "../components/main/PQuizComponent.vue";
import CQuizComponent from "../components/main/CQuizComponent.vue";
import BottomBar from "../components/bottombar/BottomBar.vue";

export default {
  name: "MainPage",
  components: { Sidebar, MainComponent, MusicBasic, PQuizComponent, CQuizComponent, BottomBar },
  setup() {
    const store = useStore();
    checkDomain();

    // time delay for all the results to compile into the vuex store properly (since it is an async function)
    setTimeout(async () => {
      if (store.state.isExisting) {
        await store.dispatch("updateInformation", {
          numOfTracks: store.state.numOfTracks,
          totalMusicFeatures: store.state.totalMusicFeatures,
          currentDate: store.state.currentDate,
        });
      } else await store.dispatch("putNewUser");
    }, 3000);

    // retrieval of the personality quiz questions from firebase realtime db
    store.dispatch("retrievePersonalityQuiz");
    // retrieval of the career quiz questions from firebase realtime db
    store.dispatch("retrieveCareerQuiz");

    // destructuring store.state
    const { nickname } = store.state;

    // setting defaults for dynamic components which switch when event emitted from MainComponent or MusicBasic
    const currentComponent = ref("");
    const components = ["MusicBasic", "PQuizComponent", "CQuizComponent"];
    const showBackBtn = ref(false);

    const changeComponent = (e) => {
      showBackBtn.value = true;
      currentComponent.value = components[e];
    };
    const hideComponent = () => {
      showBackBtn.value = false;
      currentComponent.value = "";
    };

    const shiftView = () => {
      // scroll
      let intViewportWidth = window.innerWidth;
      if (intViewportWidth <= 500) {
        window.scrollTo(0,1200)
      }
      else if (intViewportWidth > 500) {
        window.scrollTo(0,500)
      }
    };

    return {
      nickname,
      currentComponent,
      changeComponent,
      hideComponent,
      showBackBtn,
      shiftView,
    };
  },
};
</script>

<style scoped>
</style>
