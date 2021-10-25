<template>
  <div class="container pt-5">
    <h2>Please login with your spotify account</h2>
    <button class="btn btn-lg btn-success mt-5" @click="redirecting">
      Login
    </button>
  </div>
</template>

<script>
import { redirecting } from "@/components/redirect.js";
import { onBeforeMount } from "@vue/runtime-core";
import { useStore } from "vuex";

import { getPersonalities } from "../firebase";

export default {
  name: "Home",
  setup() {
    const store = useStore();
    store.commit("updateMyDomain", window.location.origin);
    onBeforeMount(async () => {
      const personalityHardcoded = await getPersonalities();
      console.log(personalityHardcoded);
    });
    return { redirecting };
  },
};
</script>

<style scoped>
.btn {
  width: 12rem;
}
</style>
