<template>
  <div
    :id="lvl"
    class="grid__item grid__item--noclick"
    :class="isCompleted ? 'quizActive' : 'quizInActive'"
  >
    <div class="box p-0">
      <div class="box__shadow"></div>
      <img :src="cardImg" :id="lvl" class="box__img" />
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
export default {
  name: "MainComponentBtn",
  // idea: lvl will have to do with deciding the ids and the imgs & img ids
  // so that means there is less to pass in and less to decide overall
  // assumption is that the numbers passed in will also already be "1", "2", "3"
  props: ["lvl", "title", "isCompleted", "cardImg", "desc"],
  setup() {
    return {};
  },
};
</script>

<style src="../../assets/GridLayoutMotionCSS/base.css" scoped></style>
