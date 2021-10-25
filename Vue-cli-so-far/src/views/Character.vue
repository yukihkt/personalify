<template>
  <div class="container">You are here, {{ nickname }}</div>
  <div class="container">this is your character: character1</div>
  <div class="container">
    <p>
      these are the genres you have listened to in the last
      {{ timeLimit }} days:
    </p>
    <li v-for="genre of genres" :key="genre">{{ genre }}</li>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { checkDomain } from "@/components/redirect.js";
export default {
  name: "Character",
  setup() {
    // using composition api a bit more
    const store = useStore();

    // check if vuex store has current domain, otherwise, path send to home
    checkDomain();

    const nickname = store.state.nickname; // no need reactivity, no longer changing until much later
    const genres = store.state.genres; // array of genres, tentative
    const timeLimit = store.state.timeLimit; // number of past days checked for recent songs

    return { nickname, genres, timeLimit };
  },
};
</script>

<style scoped></style>
