<template>
  <!-- flip card component for the about page -->
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <p class="cover">Our {{ title }} Analysis</p>
      </div>
      <div class="flip-card-back">
        <p>{{ desc }}</p>
        <ul>
          <!-- v-for here based on a arr from props -->
          <li v-for="(item, index) in listical" :key="index">{{ item }}</li>
        </ul>
        <p>{{ desc2 }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlipCard",
  props: ["title", "desc", "desc2", "listical"],
  setup() {
    return {};
  },
};
</script>

<style scoped>
/*
  tentatively copied about.css into here, will continue to edit and make nice
*/

/* start of about page design */
/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */

.cover {
  display: block;
  margin-left: auto;
  margin-right: auto;
  font-size: 3vw;
  padding-top: 50%;
  padding-left: 2%;
  padding-right: 2%;
}

.middle {
  padding-top: 40%;
}
.flip-card {
  background-color: transparent;
  width: 20vw;
  height: 60vh;
  border-radius: 10%;
  border: 1px solid black;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  vertical-align: middle;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  background-color: #218c31;
  color: white;
}

/* Style the back side */
.flip-card-back {
  background-color: white;
  color: black;
  transform: rotateY(180deg);
  padding: 10px;
  font-size: 14px;
}
/* end of about page design */
</style>
