<template>
  <div class="row">
    <LoadingTitle />
    <div class="login" v-if="showLogin">
      <h4 class="my-2">Please login with your spotify account</h4>
      <button class="btn main-btn btn-success" @click="redirecting">
        Login
      </button>
    </div>
  </div>
</template>

<script>
// choreographer to be implemented here
// const Choreographer = require("choreographer-js");
import { redirecting } from "@/components/redirect.js";
import { ref } from "vue";
import { useStore } from "vuex";
import { defaultState } from "@/components/vuex/defaultState.js";
import LoadingTitle from "@/components/LoadingTitle.vue";

export default {
  name: "Home",
  components: { LoadingTitle },
  setup() {
    const store = useStore();
    // replacing data with default state if the user is sent here
    store.replaceState(defaultState());
    // dynamic domain setting, because so many different localhost port and possible site domain
    store.commit("updateMyDomain", window.location.origin);
    const showLogin = ref(true);
    return { redirecting, showLogin };
  },
};
</script>

<style scoped>
.btn {
  width: 9.5rem;
  height: 2.7rem;
}
.login {
  margin-bottom: 30vh;
}
</style>
