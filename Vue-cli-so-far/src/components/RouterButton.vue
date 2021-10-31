<template>
  <!-- currently deciding between router btns and btns with router.push() -->
  <router-link :to="to" :class="options" @click="clicky">
    <slot />
  </router-link>
</template>

<script>
export default {
  name: "RouterButton",
  // to: router-link to view
  // options: class options for bootstrap
  // clicky: onclick function
  props: ["to", "options", "clicky"],
  setup() {
    return {};
  },
};
</script>

<style scoped></style>
