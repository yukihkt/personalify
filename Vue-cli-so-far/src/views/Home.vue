<template>
  <div class="row">
    <LoadingTitle />
    <!-- some scrolling down for the choreographer to work -->
    <div class="login" v-if="showLogin">
      <h3>Please login with your spotify account</h3>
      <button class="btn main-btn btn-success mt-1" @click="redirecting">
        Login
      </button>
    </div>
  </div>
</template>

<script>
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

    // show login, perhaps can have it as a fade if possible, considering only for now lah
    const showLogin = ref(true);
    return { redirecting, showLogin };
  },
};
</script>

<style scoped>
.main-btn {
  width: 11rem;
  height: 3.2rem;
}
.login {
  margin-bottom: 40vh;
  z-index: 1;
}
</style>
