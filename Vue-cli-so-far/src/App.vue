<template>
  <transition
    mode='out-in'
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut">
    <router-view />
  </transition>
</template>

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
  min-height: 100vh; /* clamp has no place when it comes to height */
  scroll-behavior: smooth;
}

#logo {
  font-family: "Reem Kufi", sans-serif;
  font-size: 40px;
  color: #56bd66;
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

.main-btn {
  width: 16rem;
}
</style>
