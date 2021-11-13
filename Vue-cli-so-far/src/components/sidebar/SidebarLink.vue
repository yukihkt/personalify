<template>
  <!-- sidebarlink component -->
  <router-link :to="to" class="link" :class="{ active: isActive }">
    <i class="icon" :class="icon" />
    <slot />
  </router-link>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "SidebarLink",
  props: ["to", "icon"],
  setup(props) {
    const route = useRoute();
    const isActive = computed(() => route.path === props.to);
    return { isActive };
  },
};
</script>

<style scoped>
.link {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 400;
  user-select: none;
  margin: 0.1em 0;
  padding: 1.4rem 0.4rem;
  border-radius: 0.25em;
  height: 1.5em;
  color: #fff;
  text-decoration: none;
}
.link:hover {
  /* slightly darker bg-success */
  background-color: hsl(129, 69%, 20%);
}
.link.active {
  background-color: hsl(129, 69%, 40%);
}
.link .icon {
  flex-shrink: 0;
  width: 25px;
  margin-right: 10px;
}
</style>
