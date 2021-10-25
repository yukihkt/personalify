<template>
  <!-- this is where the radio btn quiz will go -->
  <!-- v-for & v-model, every qn will have 5 radio options -->
  <!-- questions will be taken from vuex store -->
  <!-- might not need to put questions in vuex store, since only this page really needs it -->
  <div class="container">HELLO EVERYONE</div>
</template>

<script>
import { checkDomain } from "../components/redirect";

export default {
  name: "PersonalityQuiz",
  setup() {
    checkDomain();
  },
};
</script>

<style scoped></style>
