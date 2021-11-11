<template>
  <!-- :class="isCompleted ? 'quizActive' : 'quizInActive'" -->
  <!-- @click="isCompleted = true" -->
  <div :id="id" class="grid__item grid__item--noclick quizActive">
    <div class="box p-0">
      <div class="box__shadow"></div>
      <img :src="shownImg" :id="lvl" class="box__img" />
      <h3 class="box__title">
        <span class="box__title-inner" data-hover="level">
          Level {{ lvl }}
        </span>
      </h3>
      <h4 class="box__text">
        <span
          class="
            box__text-inner box__text-inner--rotated2 box__text-inner--reverse
          "
        >
          Level {{ lvl }}
        </span>
      </h4>
      <p id="box__content" class="box__content">
        <strong>{{ title }}</strong>
        {{ desc }}
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "MainComponentBtn",
  // idea: lvl will have to do with deciding the ids and the imgs & img ids
  // so that means there is less to pass in and less to decide overall
  // assumption is that the numbers passed in will also already be "1", "2", "3"
  props: ["lvl", "title", "id", "imgId", "desc"],
  setup(props) {
    const isCompleted = ref(false);

    // passing in this way works but not passing in the link directly? Not sure why
    // but I guess I can't complain too much
    const shownImg = require(`@/assets/homepage/new/${props.imgId}.svg`);

    return { isCompleted, shownImg };
  },
};
</script>

<!-- <style src="../../assets/GridLayoutMotionCSS/base.css" scoped></style> -->
<style src="../../assets/homepage/homepage.css" scoped></style>
