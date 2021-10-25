<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { checkDomain } from "@/components/redirect.js";

export default {
  name: "About",
  setup() {
    // check if vuex store has current domain, otherwise, path send to home
    checkDomain();
  },
};
</script>
