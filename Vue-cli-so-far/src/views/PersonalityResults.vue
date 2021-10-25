<template>
  <!-- results of personality quiz -->
  <div class="container"></div>
</template>

<script>
import { checkDomain } from "../components/redirect";

export default {
  name: "PersonalityResults",
  setup() {
    checkDomain();
  },
};
</script>

<style scoped></style>
