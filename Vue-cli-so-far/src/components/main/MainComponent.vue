<template>
  <div>
    <h2 class="pt-4 px-2 text-start">Hello, {{ userNick }}</h2>
    <div id="main-content-areas" class="mt-1">
      <h4 class="ps-2 text-start">
        See current quiz report or take a new one...
      </h4>
      <h6 class="ps-3 text-start text-muted fst-italic">
        ...do whatever you want I guess
      </h6>

      <div class="row d-flex justify-content-evenly me-5 ms-0">
        <div
          id="gridCards"
          v-for="(item, index) in mcb_data"
          :key="index"
          class="col-lg-4 col-sm-12"
        >
          <MainComponentBtn
            :lvl="index + 1"
            :id="item.id"
            :imgId="item.imgId"
            :title="item.title"
            :desc="item.desc"
            @click="emitClickedOn(index)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainComponentBtn from "./MainComponentBtn.vue";
import { ref } from "vue";

export default {
  name: "MainComponent",
  components: { MainComponentBtn },
  emits: ["show-component"],
  props: ["userNick"],
  // eslint-disable-next-line
  setup(props, { emit }) {
    const mcb_data = ref([
      {
        id: "basic",
        imgId: "basicimg",
        title: "Basic Personality Test",
        desc: "offers Personality Analysis based on your music taste",
      },
      {
        id: "personality",
        imgId: "personalityimg",
        title: "Personality Quiz",
        desc: "offers further insights into which of the big 5 personalities you are",
      },
      {
        id: "career",
        imgId: "careerimg",
        title: "Career Quiz",
        desc: "offers guidance on your suitable career prospects",
      },
    ]);

    const emitClickedOn = (currentLvl) => {
      console.log(typeof currentLvl);
      emit("show-component", currentLvl);
    };

    return { mcb_data, emitClickedOn };
  },
};
</script>

<style scoped>
.btn {
  width: 13rem;
  height: 13rem;
}

#gridCards {
  display: inline-flex;
  padding: 0;
}
</style>
