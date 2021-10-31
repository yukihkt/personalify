<template>
  <!-- need to add the stuff jen has done in the grp repo -->
  <Sidebar />

  <div
    style="margin-left: 18rem; margin-right: 0"
    class="row d-flex justify-content-center"
  >
    <div class="col">
      <div class="pt-5 px-3 text-start fs-2">
        <!-- header section -->
        Hello, {{ nickname }}
      </div>
      <div id="main-content-areas" class="mt-1">
        <div class="px-3 text-start fs-4">
          See current quiz report or take a new one...
        </div>
        <div class="text-center text-muted">
          <small>...do whatever you want I guess</small>
        </div>
        <div class="d-flex justify-content-evenly mt-5">
          <!-- switch with router link later -->
          <button class="btn btn-success rounded-3">Basic Personality</button>
          <router-link to="/pquiz" class="btn btn-secondary rounded-3">
            Quiz
          </router-link>
          <button class="btn btn-secondary rounded-3">Career</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { checkDomain } from "../components/redirect";
import Sidebar from "../components/sidebar/Sidebar.vue";

export default {
  name: "MainPage",
  components: { Sidebar },
  setup() {
    const store = useStore();
    checkDomain();

    const nickname = store.state.nickname;

    return { nickname };
  },
};
</script>

<style scoped>
.btn {
  width: 13rem;
  height: 13rem;
}
</style>
