<template>
  <!-- sidebar component -->
  <div id="sidebar">
    <span id="logo" class="text-decoration-underline">Personalify</span>
    <!-- main navigation cluster -->
    <SidebarLink to="/main" icon="fas fa-home">Home</SidebarLink>
    <SidebarLink to="/about" icon="fas fa-info-circle">About</SidebarLink>
    <!-- <SidebarLink to="/report" icon="fas fa-file-alt">Report</SidebarLink> -->
    <!-- no need replace, since the user's local store will get reset automatically anyways -->
    <SidebarLink to="/" icon="fas fa-sign-out-alt">Logout</SidebarLink>
  </div>
</template>

<script>
import SidebarLink from "./SidebarLink.vue";

export default {
  name: "Sidebar",
  components: { SidebarLink },
  setup() {
    return {};
  },
};
</script>

<style scoped>
#sidebar {
  color: #fff;
  background-color: #101010;
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  width: 18rem;
}
#logo {
  font-size: 30px;
  margin: 12px 0 8px;
}
.btn {
  background-color: #000;
  color: #fff;
}
</style>
