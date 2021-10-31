<template>
  <Sidebar />

  <div
    style="margin-left: 18rem; margin-right: 0"
    class="row d-flex justify-content-center"
  >
    <div class="col">
      <div class="pt-5 px-3 text-start fs-2">
        <!-- header section -->
        About Personalify
      </div>
      <div id="main-content-areas" class="mt-1">
        <!-- various containers of text -->
        <!-- what is personalify about, what does it hope to achieve -->
        <!-- current working status, also the members who worked on it -->
        <!-- what the site is powered by perhaps, and the components -->
        <!-- that make up the site, since it is a programming project -->
        <div class="container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkDomain } from "../components/redirect";
import Sidebar from "../components/sidebar/Sidebar.vue";

export default {
  name: "About",
  components: { Sidebar },
  setup() {
    checkDomain();
    return {};
  },
};
</script>

<style scoped></style>
