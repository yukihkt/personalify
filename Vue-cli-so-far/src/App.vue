<template>
  <router-view />
</template>

<script setup>
console.log("app created");
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Reem+Kufi&family=Roboto&display=swap");

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  color: #fff;
  background-color: #181818;
  height: 100vh;
}

#logo {
  font-family: "Reem Kufi", sans-serif;
}

.darkgreen {
  color: #218c31;
}

.bgdarkgreen {
  background-color: #218c31;
}

.lightgreen {
  color: #56bd66;
}

.bglightgreen {
  background-color: #56bd66;
}

.typed-cursor {
  font-size: 30px;
  opacity: 1;
  -webkit-animation: blink 0.7s infinite;
  -moz-animation: blink 0.7s infinite;
  animation: blink 0.7s infinite;
}

.btn {
  width: 12rem;
}
</style>
