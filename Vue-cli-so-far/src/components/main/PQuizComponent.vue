<template>
  <div class="mx-2">
    <!-- start of the quiz component -->
    <div class="pt-4 px-1 text-start fs-2">
      <!-- header section -->
      <span class="logo">Personality Quiz</span>
    </div>
    <br />
    <div id="main-content-areas" class="rounded-3 bg-pinkred ">
      <div class="firstInner">
        <vueper-slides :dragging-distance="70" prevent-y-scroll>
          <!-- v-if="!showQuiz" -- not sure if to have or not -->
          <vueper-slide>
            <!-- initial slide, welcome type-message -->
            <template #content>
              <div class="vueperslide__content-wrapper">
                <h4 class="font">Personality Quiz</h4>
                <h5 class="font">15 customised questions, just for you.</h5>
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
                  <span class="mx-3 radioBtnProg">
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
                    <label :for="slide.id + '0'" class="btn btn-dark">
                      Not Me
                    </label>
                  </span>
                  <span class="mx-3 radioBtnProg">
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
                    <label :for="slide.id + '1'" class="btn btn-success">
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
                  @click="submitQuiz(); $emit('changePQuiz',quizDone)"
                >
                  Submit Quiz
                </button>
              </div>
            </template>
          </vueper-slide>
        </vueper-slides>
      </div>
    </div>
    <br />
    <!-- end of the quiz component -->
    <!-- changes also made here -->
    <div v-if="quizDone">
      <div id="quiz-question-results" class="row row-cols-auto text-center justify-content-center py-4 px-3 rounded-3 bg-pinkred">
      <!-- no spider web, type out the results or whatever aight -->
        <div class = "col-12">
        <h6 class = "left-text">RESULTS</h6>
        <h2 class = "left-text">Personality Quiz</h2>
        <br><br><br>
        </div>
        <div
          v-for="(result, category, index) in $store.state.personalityResults"
          :key="index"
          class="col-12 col-lg-6 col-xl-4 rounded-3 px-2 py-2 shadow-sm"
        >
          <br>
          <h4 class="font"><strong>{{ category }}</strong></h4>
          <div>Your score: {{ result[0] }}</div>
          <div class = "px-4">{{ result[1] }}</div>
          <br>
        </div>
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
    const quizDone = ref(false);
    if (personalityResults) quizDone.value = true;

    // v-modeled question answers; start from 1, end at 15
    const userAnswers = ref({});
    const showQuiz = ref(false);
    const startQuiz = () => {
      showQuiz.value = true;
      quizDone.value = false;
      personalityResults = {
        Agreeableness: [0, ""],
        Conscientiousness: [0, ""],
        Extroversion: [0, ""],
        Neuroticism: [0, ""],
        Openness: [0, ""],
      };
    };

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
    // console.log(categories);

    // only shows when all questions are answered
    const submitQuiz = () => {
      console.log(personalityResults);
      console.log(userAnswers.value);
      quizDone.value = true;
      showQuiz.value = false;
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
            } else {
              // if (personalityResults[category][0] >= 2 && lvl.includes("high"))
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

#main-content-areas{
  position: sticky;
  z-index:0;
}

.left-text{
  text-align: left;
  font-weight: bolder;
}

.font {
  font-family: "Reem Kufi", sans-serif;
}

.logo {
  font-family: "Reem Kufi", sans-serif;
  color: #56bd66;
}

@media (max-width: 768px) {
  
  #main-content-areas, #vueperslide{
    height: 110%;
  }

  #main-content-areas .firstInner{
    bottom: 0;
    margin: 0;
    padding: 0;
  }

  .vueperslide {
    height: 100%;
    top: 8%;
  }

  .vueperslide__content-wrapper h3,
  .vueperslide__content-wrapper h4 {
    font-size: 1rem;
  }
  .vueperslide__content-wrapper h5 {
    font-size: 1rem;
    margin-bottom: -0.5rem;
  }
  
  .main-quiz-btn {
    margin-bottom: 2vw;
  }

  .radioBtnProg input[type=radio] {
    width: 0.5rem;
    height: 0.5rem;
  }

  .vueperslide__content-wrapper input {
    width: 3vw;
  }

}
</style>
