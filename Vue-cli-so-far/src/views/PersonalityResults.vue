<template>
  <!-- currently deprecated, no one wants to use anymore unfortunately -->
  <!-- so the strat I'm feeling is to rename this file for the career quiz SFC -->
  <Sidebar />

  <!-- the main container where the content will go, this will act -->
  <!-- as the code's body from here on out as the sidebar exists -->
  <div class="d-flex pt-3 justify-content-center" style="margin-left: 19rem">
    PLACEHOLDER: { HELLO REPORT }
  </div>
  <!-- this will contain the sidebar component and the main content component -->
  <!-- main content component is just a buzz word for dynamic components -->
  <!-- also there is a header which says "Hello, nickname" -->
  <!-- the components will be "see current quiz report or take a new one" -->
  <!-- "basic personality (music)", "various quizzes etc" -->
</template>

<script>
import { checkDomain } from "../components/redirect";
import Sidebar from "../components/sidebar/Sidebar.vue";

export default {
  name: "PersonalityResults",
  components: { Sidebar },
  setup() {
    checkDomain();
    return {};
  },
};
</script>

<style scoped></style>
