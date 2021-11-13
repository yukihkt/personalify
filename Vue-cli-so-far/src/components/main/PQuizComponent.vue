<template>
  <div class="mx-5">
    <!-- start of the quiz component -->
    <div class="pt-4 px-3 text-start fs-2">
      <!-- header section -->
      Personality Quiz
    </div>
    <br />
    <div id="main-content-areas" class="mt-1 rounded-3 bg-pinkred">
      <div>
        <vueper-slides :dragging-distance="70" prevent-y-scroll>
          <!-- v-if="!showQuiz" -- not sure if to have or not -->
          <vueper-slide>
            <!-- initial slide, welcome type-message -->
            <template #content>
              <div class="vueperslide__content-wrapper" style="z-index=-1;">
                <h4 class='words'>Personality Quiz</h4>
                <h3 class='words'>(15 True/False questions)</h3>
                <button
                  @click="startQuiz"
                  data-bs-toggle="button"
                  class="main-quiz-btn btn btn-outline-light mt-3"
                >
                  Start Quiz
                </button>
              </div>
            </template>
          </vueper-slide>
          <!-- main question slides -->
          <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for prettier/prettier -->
            <vueper-slide v-for="slide in slides" :key="slide.id" v-if="showQuiz">
            <template #content>
              <div class="vueperslide__content-wrapper">
                <h3>{{ slide.title }}</h3>
                <div class="flex-row mt-2">
                  <span class="mx-3">
                    <input
                      class="btn-check me-1"
                      type="radio"
                      :id="slide.id + '0'"
                      :name="slide.id"
                      :value="0"
                      :disabled="quizDone"
                      v-model="userAnswers[slide.id]"
                      autocomplete="off"
                    />
                    <label :for="slide.id + '0'" class="btn btn-outline-light">
                      Not Me
                    </label>
                  </span>
                  <span class="mx-3">
                    <input
                      class="btn-check me-1"
                      type="radio"
                      :id="slide.id + '1'"
                      :name="slide.id"
                      :value="1"
                      :disabled="quizDone"
                      v-model="userAnswers[slide.id]"
                      autocomplete="off"
                    />
                    <label :for="slide.id + '1'" class="btn btn-outline-light">
                      That's Me
                    </label>
                  </span>
                </div>
              </div>
            </template>
          </vueper-slide>
          <vueper-slide v-if="Object.keys(userAnswers).length == 15">
            <!-- final submit button, v-if show only if done? -->
            <template #content>
              <div class="vueperslide__content-wrapper">
                <button
                  class="main-quiz-btn btn btn-outline-light"
                  data-bs-toggle="button"
                  @click="submitQuiz"
                >
                  Submit Quiz
                </button>
              </div>
            </template>
          </vueper-slide>
        </vueper-slides>
      </div>
      {{ userAnswers }}
    </div>
    <br />
    <!-- end of the quiz component -->
    <!-- changes also made here -->
    <div
      class="row row-cols-auto text-center"
      id="quiz-question-results"
      v-if="submitQuiz"
    >
      <!-- no spider web, type out the results or whatever aight -->
      <div
        v-for="(result, category, index) in $store.state.personalityResults"
        :key="index"
        class="col-12 col-lg-6 bg-success py-4 px-3"
      >
        <h4><strong>{{ category }}</strong></h4>
        <div>Your score: {{ result[0] }}</div>
        <div><br>{{ result[1] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  name: "PQuizComponent",
  components: { VueperSlides, VueperSlide },
  setup() {
    const store = useStore();
    const { personalityQuestions, personalityAnswers } = store.state;
    let { personalityResults } = store.state;

    // additional check for if the results are already set, if so, perhaps layout
    // the data on the bottom by default? Otherwise storing this data is pretty pointless at the moment

    // preparing the results obj early, no ref needed
    const categories = [];
    const slides = ref([]); // slides for the questions
    // adding questions as individual slides to the slides array
    for (const { id, question, category } of personalityQuestions) {
      slides.value.push({
        id: id,
        title: question,
      });
      categories.push(category);
    }
    console.log(categories);

    // v-modeled question answers
    // start from 1, end at 15
    const userAnswers = ref({});

    const showQuiz = ref(false);
    const startQuiz = () => (showQuiz.value = true);
    const quizDone = ref(false);

    if (personalityResults == "")
      personalityResults = {
        Agreeableness: [0, ""],
        Conscientiousness: [0, ""],
        Extroversion: [0, ""],
        Neuroticism: [0, ""],
        Openness: [0, ""],
      };

    // only shows when all questions are answered
    const submitQuiz = () => {
      quizDone.value = true;
      // console.log(userAnswers.value);
      for (const index in categories) {
        // index is a string, convert to Number to prevent NaN value
        personalityResults[categories[index]][0] +=
          userAnswers.value[Number(index) + 1];
      }
      // looping around the results obj // change 2
      for (const category in personalityResults) {
        for (const lvl in personalityAnswers) {
          if (lvl.includes(category)) {
            if (personalityResults[category][0] <= 1 && lvl.includes("low")) {
              personalityResults[category][1] = personalityAnswers[lvl];
              break;
            }
            if (personalityResults[category][0] >= 2 && lvl.includes("high")) {
              personalityResults[category][1] = personalityAnswers[lvl];
              break;
            }
          }
        }
      }
      // unsure if this is necessary, unless we are showing some other things
      console.log(personalityResults);
      // updating the vuex store (for consistency and future checking)
      store.commit("updatePersonalityResults", personalityResults);
      // update the firebase next
      store.dispatch("updateInformation", {
        personalityResults: personalityResults,
      });
    };

    return {
      quizDone,
      showQuiz,
      startQuiz,
      submitQuiz,
      slides,
      userAnswers,
    };
  },
};
</script>

<style scoped>
.main-quiz-btn {
  width: 8rem;
  height: 3rem;
  margin: 0 0.5rem 0;
}
.bg-pinkred {
  background-color: hsl(0, 86%, 61%);
}

.words{
  z-index: -1;
}
</style>
