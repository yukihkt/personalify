<template>
  <!-- sidebar component -->
  <div id="sidebar">
    <!-- img or something if we have one, afaik we don't -->
    <span id="logo">
      <i class="bi bi-person-circle" />
      Personalify
    </span>

    <!-- main navigation cluster -->
    <SidebarLink to="/main" icon="fas fa-home">Home</SidebarLink>
    <SidebarLink to="/about" icon="fas fa-info-circle">About</SidebarLink>
    <SidebarLink to="/report" icon="fas fa-file-alt">Report</SidebarLink>

    <!-- need to somehow pass in the attribute of "replace into this one" -->
    <!-- not sure how I will do so, but it is needed for my plan -->
    <SidebarLink to="/" icon="fas fa-sign-out-alt" @click="logout">
      Logout
    </SidebarLink>
  </div>
</template>

<script>
import SidebarLink from "./SidebarLink.vue";

export default {
  name: "Sidebar",
  components: { SidebarLink },
  setup() {
    const logout = () => {
      // this function routes the user back to the home page,
      // data that can be saved should be routed into the firebase store,
      // the click should clear the vuex persisted store in the process
      // and reset the user login state, so the user can leave the thing
      console.log("logout function");
    };
    return { logout };
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
