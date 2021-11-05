<template>
  <!-- need to add the stuff jen has done in the grp repo -->
  <Sidebar />

  <div
    style="margin-left: 18rem; margin-right: 0"
    class="row d-flex justify-content-center"
  >
    <div class="col">
      <div class="pt-5 px-3 text-start fs-2">Hello, {{ nickname }}</div>
      <!-- to replace with dynamic component -->
      <!-- <MainComponent /> -->
      <!-- <MusicBasic /> -->
      <component :is="currentComponent" @to-other-component="changeComponent" />
    </div>
    <!-- could have the quizzes be it's own component in this current -->
    <!-- page, and that would work well for what is needed and necessary -->
    <!-- a new view is cool, but the idea of components is also cool -->
  </div>
</template>

<script>
import { useStore } from "vuex";
import { checkDomain } from "../components/redirect";
import Sidebar from "../components/sidebar/Sidebar.vue";
import MainComponent from "../components/main/MainComponent.vue";
import MusicBasic from "../components/main/MusicBasic.vue";
import { ref } from "vue";

export default {
  name: "MainPage",
  components: { Sidebar, MainComponent, MusicBasic },
  setup() {
    const store = useStore();
    checkDomain();

    // destructuring store.state
    const { nickname } = store.state;

    // setting defaults for dynamic components which switch when event emitted from MainComponent or MusicBasic
    const currentComponent = ref("MainComponent");
    let hiddenComponent = "MusicBasic";

    const changeComponent = () => {
      let temp = currentComponent.value;
      console.log({ temp });
      currentComponent.value = hiddenComponent;
      hiddenComponent = temp;
      console.log({ temp });
    };

    return { nickname, currentComponent, changeComponent };
  },
};
</script>

<style scoped></style>
