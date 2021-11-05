<template>
  <Sidebar />

  <div
    style="margin-left: 18rem; margin-right: 0"
    class="row d-flex justify-content-center px-4 pb-3"
  >
    <div class="col">
      <!-- start of the quiz component -->
      <div v-if="!quizDone">
        <div class="pt-4 px-3 text-start fs-2">
          <!-- header section -->
          Personality Quiz
        </div>
        <hr />
        <div id="main-content-areas" class="mt-1 rounded-3 bg-pinkred">
          <div>
            <vueper-slides :dragging-distance="70" prevent-y-scroll>
              <!-- v-if="!showQuiz" -- not sure if to have or not -->
              <vueper-slide>
                <!-- initial slide, welcome type-message -->
                <template #content>
                  <div class="vueperslide__content-wrapper">
                    <div>Personality Quiz</div>
                    <div>(15 True/False questions)</div>
                    <div>
                      <button
                        @click="startQuiz"
                        class="btn btn-outline-light mt-3"
                      >
                        Start Quiz
                      </button>
                    </div>
                  </div>
                </template>
              </vueper-slide>
              <!-- main question slides -->
              <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for prettier/prettier -->
              <vueper-slide v-for="slide in slides" :key="slide.id" v-if="showQuiz">
                <template #content>
                  <div class="vueperslide__content-wrapper">
                    <div>{{ slide.title }}</div>
                    <div class="flex-row mt-2">
                      <span class="m-3">
                        <input
                          class="form-check-input mx-1"
                          type="radio"
                          :id="slide.id"
                          :name="slide.id"
                          :value="0"
                          v-model="personalityAnswers[slide.id]"
                        /><label :for="slide.id">Not Me</label>
                      </span>
                      <span class="m-3">
                        <input
                          class="form-check-input mx-1"
                          type="radio"
                          :id="slide.id + 1"
                          :name="slide.id"
                          :value="1"
                          v-model="personalityAnswers[slide.id]"
                        /><label :for="slide.id + 1">That's Me</label>
                      </span>
                    </div>
                  </div>
                </template>
              </vueper-slide>
              <vueper-slide v-if="Object.keys(personalityAnswers).length == 15">
                <!-- final submit button, v-if show only if done? -->
                <template #content>
                  <div class="vueperslide__content-wrapper">
                    <button class="btn btn-outline-light" @click="submitQuiz">
                      Submit Quiz
                    </button>
                  </div>
                </template>
              </vueper-slide>
            </vueper-slides>
          </div>
        </div>
        <br />
        <div>
          {{ personalityAnswers }}
        </div>
      </div>
      <!-- end of the quiz component -->
      <div class="" id="quiz-question-results" v-else>
        <!-- no spider web, type out the results or whatever aight -->
        <li
          v-for="(result, category, index) in $store.state.personalityResults"
          :key="index"
        >
          {{ category }}: {{ result }}
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { checkDomain } from "../components/redirect";
import Sidebar from "../components/sidebar/Sidebar.vue";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  name: "MainPage",
  components: { Sidebar, VueperSlides, VueperSlide },
  setup() {
    checkDomain();
    const store = useStore();
    const quiz = store.state.personalityQuestions;

    // preparing the results obj early, no ref needed
    const categories = [];

    const slides = ref([]); // slides for the questions
    // for loop adding questions as individual slides to the slides array
    for (const { id, question, category } of quiz) {
      slides.value.push({
        id: id,
        title: question,
      });
      categories.push(category);
    }

    // v-modeled question answers
    const personalityAnswers = ref({});

    const showQuiz = ref(false);
    const startQuiz = () => (showQuiz.value = true);
    const quizDone = ref(false);

    const results = store.state.personalityResults;

    // only shows when all questions are answered
    const submitQuiz = () => {
      quizDone.value = true;
      // 5 categories, 15 questions, 3 questions per category
      // results obj used here
      console.log(personalityAnswers.value);
      for (const index in categories) {
        // index is a string (becos categories is an obj)
        // need to convert to Number to prevent NaN value
        results[categories[index]] +=
          personalityAnswers.value[Number(index) + 1];
      }
      store.commit("updatePersonalityResults", results);
    };

    return {
      quizDone,
      showQuiz,
      startQuiz,
      submitQuiz,
      slides,
      personalityAnswers,
    };
  },
};
</script>

<style scoped>
.btn {
  width: 8rem;
  height: 3rem;
  margin: 0 0.5rem 0;
}
.submit-btn {
  width: 12rem;
  height: 4rem;
}
.bg-pinkred {
  background-color: hsl(300, 69%, 70%);
}
/* .vueperslides__bullet span {
  display: block;
  color: #fff;
  font-size: 10px;
  opacity: 0.8;
}
.vueperslides__bullet--active .default {
  background-color: #42b983;
}
.vueperslides__bullet .default {
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  box-shadow: none;
  transition: 0.3s;
  width: 16px;
  height: 16px;
} */
</style>
