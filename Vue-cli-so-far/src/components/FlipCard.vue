<template>
  <!-- flip card component for the about page -->
  <div class="col-lg-3 col-md-6 col-12">
    <div id="covers">
      <div class="card">
        <div class="content">
          <div class="front">
            <img :src="flipImg" />
          </div>
          <div class="back">
            <p>{{ desc }}</p>
            <ul>
              <!-- v-for here based on a arr from props -->
              <li v-for="(item, index) in listical" :key="index">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlipCard",
  props: ["title", "desc", "desc2", "listical", "cardImg"],
  setup(props) {
		// ayo so this works but pushing in the full relative link doesn't work btw
		const flipImg = require(`@/assets/homepage/new/${props.cardImg}.svg`);

    return { flipImg };
  },
};
</script>

<style scoped>
.card {
  /* position: absolute; */
  padding: 1rem;
  /* width: 15rem; */
  /* height: 15rem; */
  /* margin: -150px; */
  float: left;
  perspective: 500px;
  background-color: rgba(36, 36, 36, 0.808);
  margin-bottom: 5vh;
}

.content {
  /* position: absolute; */
  width: 100%;
  height: 100%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);

  transition: transform 1s;
  transform-style: preserve-3d;
}

.card:hover .content {
  transform: rotateY(180deg);
  transition: transform 0.5s;
}

.card:hover .front {
  display: none;
}

.front img,
.back img {
  width: 100%;
  height: 100%;
}

.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  /* min-height: 100%;
	min-width: 100%;
	max-height: fit-content;
	max-width: fit-content; */
  /* background: white; */
  color: #03446a;
  text-align: center;
  font-size: 1rem;
  border: transparent 1px solid;
  border-radius: 8%;
  backface-visibility: hidden;
  padding: 0;
  margin: 0;
}

.back {
  background: white;
  color: black;
  transform: rotateY(180deg);
  font-size: 80%;
}

#covers .card,
#covers .content {
  position: relative;
  width: 18rem;
  height: 18rem;
}

#covers .card {
  justify-items: center;
  align-items: center;
}

p {
  margin: 8px;
}

ul,
li {
  /* text-align: left; */
  margin: 0;
  padding: 0;
}
</style>
