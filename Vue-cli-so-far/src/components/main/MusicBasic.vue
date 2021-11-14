<template>
  <div>
    <!-- some space for the music basic area, this is a component -->
    <div id="chart1" class="mt-3 container bglightgreen rounded-3">
      <canvas ref="featureChart"></canvas>
    </div>
    <div
      class="
        mt-2
        rounded-3
        bg-success
        row row-cols-auto
        d-flex
        justify-content-center
      "
      style="width: 80vw"
    >
      <div
        class="col-12 col-lg-6 col-xl-4 py-2"
        v-for="(value, feature) in nonChart"
        :key="feature"
      >
        {{ feature }}: {{ value }}
      </div>
    </div>
    <!-- second chart for Big 5 personality -->
    <div id="chart2" class="mt-3 container bglightgreen rounded-3">
      <canvas ref="personalityTraits"></canvas>
    </div>
    <div
      class="
        mt-2
        rounded-3
        bg-success
        row row-cols-auto
        d-flex
        justify-content-center
      "
      style="width: 80vw"
    >
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import Chart from "chart.js/auto";
import { ref, onMounted } from "vue";

export default {
  name: "MusicBasic",
  emits: ["to-other-component"],
  // eslint-disable-next-line
  setup(props, { emit }) {
    const store = useStore();

    const { totalMusicFeatures, numOfTracks } = store.state;

    const nonChart = { loudness: 0, tempo: 0, duration_ms: 0, key: 0, mode: 0 };
    const chartFeatures = {};
    for (let feature in totalMusicFeatures) {
      const avgMusicFeatures = (
        totalMusicFeatures[feature] / numOfTracks
      ).toFixed(2);
      if (!(feature in nonChart)) chartFeatures[feature] = avgMusicFeatures;
      else nonChart[feature] = avgMusicFeatures;
    }

    const featureChart = ref(null);
    const personalityTraits = ref(null);

    const pTraits = {agreeableness:0, conscientiousness: 0, neuroticism: 0, openness_to_experience: 0, extraversion: 0};

    onMounted(() => {
      // eslint-disable-next-line
      const myChart1 = new Chart(featureChart.value, {
        type: "radar",
        data: {
          labels: Object.keys(chartFeatures), // array of music features labels
          datasets: [
            {
              label: "Your Music Traits",
              data: Object.values(chartFeatures),
              fill: true,
              backgroundColor: "rgba(33, 140, 49, 0.3)",
              borderColor: "rgb(33, 140, 49)", // .bgdarkgreen color scheme
              pointBackgroundColor: "rgb(33, 140, 49)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgb(33, 140, 49)",
            },
          ],
        },
        options: {
          elements: {
            line: {
              borderWidth: 2,
            },
          },
        },
      });
    });
  /* eslint-disable no-unused-vars */
    onMounted(() => {
      // second chart
      const myChart2 = new Chart(personalityTraits.value, {
        type: "radar",
        data: {
          labels: ["Openness to experience", "Agreeableness", "Extraversion", "Neuroticism", "Conscientiousness"], // array of personality traits
          datasets: [
            {
              label: "Your Personality Traits",
              data: Object.values(pTraits),
              fill: true,
              backgroundColor: "rgba(33, 140, 49, 0.3)",
              borderColor: "rgb(33, 140, 49)", // .bgdarkgreen color scheme
              pointBackgroundColor: "rgb(33, 140, 49)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgb(33, 140, 49)",
            },
          ],
        },
        options: {
          elements: {
            line: {
              borderWidth: 2,
            },
          },
        },
      });
    });

    /* eslint-enable no-unused-vars */

    const returnToMain = () => emit("to-other-component");

    return { returnToMain, featureChart, nonChart, personalityTraits, pTraits };
  },
};
</script>

<style scoped>
.btn {
  width: 9.5rem;
  height: 3rem;
}
#chart1 {
  width: 96%;
}

#chart2 {
  width: 96%;
}

</style>
