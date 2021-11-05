<template>
  <!-- some space for the music basic area, this is a component -->
  <div class="container-fluid text-start mt-2">
    <button @click="returnToMain" class="btn btn-success">
      Return to main
    </button>
    <ul>
      <li v-for="(value, key) in avgMusicFeatures" :key="key">
        {{ key }}: {{ value }}
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "MusicBasic",
  emits: ["to-other-component"],
  // eslint-disable-next-line
  setup(props, { emit }) {
    const store = useStore();

    const { totalMusicFeatures, numOfTracks } = store.state;

    let avgMusicFeatures = {};
    for (let feature in totalMusicFeatures) {
      avgMusicFeatures[feature] = totalMusicFeatures[feature] / numOfTracks;
    }
    console.log(avgMusicFeatures);

    const returnToMain = () => emit("to-other-component");

    return { returnToMain, avgMusicFeatures };
  },
};
</script>

<style scoped></style>
