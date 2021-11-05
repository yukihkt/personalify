<template>
  <div id="main-content-areas" class="mt-1">
    <div class="px-3 text-start fs-4">
      See current quiz report or take a new one...
    </div>
    <div class="text-center text-muted">
      <small>...do whatever you want I guess</small>
    </div>
    <div class="d-flex justify-content-evenly mt-5">
      <button @click="toLvl" class="btn btn-success rounded-3" id="1">
        Basic Personality
      </button>
      <button @click="toLvl" class="btn btn-secondary rounded-3" id="2">
        Quiz
      </button>
      <button @click="toLvl" class="btn btn-secondary rounded-3" id="3">
        Career
      </button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "MainComponent",
  emits: ["to-other-component"],
  // eslint-disable-next-line
  setup(props, { emit }) {
    const router = useRouter();

    const toLvl = (e) => {
      const lvl = e.currentTarget.id;
      if (lvl === "1") emit("to-other-component");
      if (lvl === "2") router.push({ path: "/pquiz" });
      if (lvl === "3") console.log("career quiz -- TBD");
    };
    return { toLvl };
  },
};
</script>

<style scoped>
.btn {
  width: 13rem;
  height: 13rem;
}
</style>
