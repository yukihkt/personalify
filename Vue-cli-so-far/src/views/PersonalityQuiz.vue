<template>
  <!-- this page is super incomplete -->
  <Sidebar />

  <div
    style="margin-left: 18rem; margin-right: 0"
    class="row d-flex justify-content-center px-4 pb-3"
  >
    <div class="col" v-if="!quizDone">
      <div class="pt-4 px-3 text-start fs-2">
        <!-- header section -->
        Personality Quiz
      </div>
      <hr />
      <div id="main-content-areas" class="mt-1">
        <div class="rounded-3">
          <div>
            <!-- v-for each traits -->
            <div
              v-for="(questions, trait) in $store.state.personalityQuestions"
              :key="trait"
            >
              <!-- v-for each question of each trait -->
              <div class="mb-2" v-for="(qn, index) in questions" :key="index">
                <br />
                <br />
                <!-- should give this guy a nice css class -->
                <div class="fs-3">{{ qn }}</div>
                <!-- replace btns with input radio -->
                <!-- not too sure how the v-models will look in the end -->
                <!-- <input type="radio" /> -->
                <button
                  @click="is_Me(0, trait, index, $event)"
                  class="btn btn-outline-success"
                >
                  Not Me
                </button>
                <button
                  @click="is_Me(1, trait, index, $event)"
                  class="btn btn-outline-success"
                >
                  That's Me
                </button>
              </div>
              <br />
              <hr />
            </div>
            <button
              @click="submitQuiz"
              class="submit-btn btn btn-success bgdarkgreen mb-3"
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="col" id="quiz-question-results" v-if="quizDone">
      <!-- v-if depending on if submitquiz is pressed -->
      <!-- I assume the calculation works as follows -->
      <!-- 5 sections, 3 questions each, max 3pts per section -->
      <!-- so max 15pts, radius of polygon is 3 -->
      <!-- to make the polygon, we need a bunch of numbers -->
      <!-- an example is this one, this is for a single polygon
        <svg height="120" width="120" style="background-color: lightgray;">
          <polygon points="60,13 110,48 92,110 30,110 13,48" />
          Sorry, your browser does not support inline SVG.
        </svg>
      -->
      <!-- so we need a bunch of x,y values, 5 in fact, with pre-calc -->
      <!-- values that correspond to the points from the quiz -->
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { checkDomain } from "../components/redirect";
import { newConfig, axiosAwait } from "../components/getPost";
import Sidebar from "../components/sidebar/Sidebar.vue";

export default {
  name: "MainPage",
  components: { Sidebar },
  setup() {
    const store = useStore();
    checkDomain();

    // checks the quiz questions and the options
    onBeforeMount(async () => {
      // using the firebase db first
      const config = newConfig(
        "GET",
        `${store.state.myDatabase}/quizzes/personality_quiz/questions.json`
      );
      const db_quiz = await axiosAwait(config);
      if (db_quiz) store.commit("updatePersonalityQuestions", db_quiz);
      else console.log("Unable to retrieve personality questions");
    });

    const is_Me = (points, trait, qn, event) => {
      const current_Target = event.currentTarget.classList;
      current_Target.remove("btn-outline-success");
      current_Target.add("btn-success");
      console.log({ points, trait, qn, event, current_Target });
    };

    const quizDone = ref(false);
    const submitQuiz = () => {
      // next problem, need to validate checkboxes and all
      quizDone.value = true;
      console.log("SUBMIT QUIZ");
    };

    return { is_Me, submitQuiz, quizDone };
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
</style>
