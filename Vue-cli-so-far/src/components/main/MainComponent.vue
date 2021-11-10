<template>
  <h2 class="pt-5 px-3 text-start">Hello, {{ userNick }}</h2>
  <div id="main-content-areas" class="mt-1">
    <h4 class="ps-3 text-start">
      See current quiz report or take a new one...
    </h4>
    <h6 class="ps-4 text-start text-muted fst-italic">
      ...do whatever you want I guess
    </h6>

    <!-- the main part of the animate.js and GridLayoutMotion replace -->
    <div class="d-flex justify-content-evenly mt-5">
      <button id="0" @click="emitFunc" class="btn btn-success rounded-3">
        Basic Personality
      </button>
      <button id="1" @click="emitFunc" class="btn btn-secondary rounded-3">
        Quiz
      </button>
      <button id="2" @click="emitFunc" class="btn btn-secondary rounded-3">
        Career
      </button>
    </div>

    <!-- starting the the new things here for the better comparisons -->
    <div class="grid content">
      <!-- will v-for this with the MainComponentBtn inside -->
      <div id="gridCards">
        <!-- <MainComponentBtn /> -->
      </div>
    </div>
  </div>
</template>

<script>
import MainComponentBtn from "./MainComponentBtn.vue";

export default {
  name: "MainComponent",
  // eslint-disable-next-line
  components: { MainComponentBtn },
  emits: ["show-component"],
  props: ["userNick"],
  // eslint-disable-next-line
  setup(props, { emit }) {
    const emitFunc = (e) => {
      const currTarg = e.currentTarget.id;
      console.log(currTarg, typeof currTarg);
      emit("show-component", currTarg);
    };

    return { emitFunc };
  },
};
</script>

<style scoped>
.btn {
  width: 13rem;
  height: 13rem;
}
</style>
<!-- <style src="../../assets/GridLayoutMotionCSS/base.css" scoped></style> -->
<style src="../../assets/homepage/homepage.css" scoped></style>
