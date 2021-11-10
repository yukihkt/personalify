<template>
  <!-- need to add the stuff jen has done in the grp repo -->
  <Sidebar />
  <div
    style="margin-left: 18rem; margin-right: 0"
    class="row d-flex justify-content-center"
  >
    <div class="col">
      <MainComponent :userNick="nickname" @show-component="changeComponent" />
      <button
        @click="hideComponent"
        class="btn btn-outline-light mt-4"
        v-if="showBackBtn"
      >
        Hide Component
      </button>
      <!-- caching recent progress, so if user wants to switch off for a bit -->
      <!-- they don't lose their progress -->
      <keep-alive>
        <component :is="currentComponent" class="mb-5" />
      </keep-alive>
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

export default {
  name: "MainPage",
  components: { Sidebar, MainComponent, MusicBasic, PQuizComponent },
  setup() {
    const store = useStore();
    checkDomain();

    // if the user is new, then PUT in all the data from the vuex store
    // now that the user has landed on /main (all through vuex store)
    // and if the user is existing (i.e. they registered and landed before)
    // only new info that was collected when they logged in (level 1 stuff)
    // will need to be updated via PATCH
    // wait 3 seconds before sending the data, might have longer delay
    // but need more tests first (delay is so that the vuex can update)
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

    // destructuring store.state
    const { nickname } = store.state;

    // setting defaults for dynamic components which switch when event emitted from MainComponent or MusicBasic
    const currentComponent = ref("");
    const components = ["MusicBasic", "PQuizComponent"];
    const showBackBtn = ref(false);

    const changeComponent = (e) => {
      showBackBtn.value = true;
      currentComponent.value = components[e];
    };
    const hideComponent = () => {
      showBackBtn.value = false;
      currentComponent.value = "";
    };

    return {
      nickname,
      currentComponent,
      changeComponent,
      hideComponent,
      showBackBtn,
    };
  },
};
</script>

<style scoped></style>
