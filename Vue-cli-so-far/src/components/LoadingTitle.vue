<template>
  <div id="box" class="col-12 d-flex justify-content-center">
    <div class="container-fluid-top container-fluid">
      <div
        id="logo"
        ref="logo_area"
        style="font-size: 4.8rem"
        class="d-flex text-success justify-content-center"
      >
        <div class="P">P</div>
        <div class="e">e</div>
        <div class="r">r</div>
        <div class="s">s</div>
        <div class="o">o</div>
        <div class="n">n</div>
        <div class="a">a</div>
        <div class="l">l</div>
        <div class="i">i</div>
        <div class="f">f</div>
        <div class="y">y</div>
      </div>
      <div
        id="scroll-down"
        class="text-center col-12"
        ref="scroll_down"
        style="color: gray"
      >
        <p>Scroll Down</p>
        <!-- arrow pointing down -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          fill="white"
          class="bi bi-arrow-down"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import Choreographer from "choreographer-js";
import { onMounted } from "vue";

export default {
  name: "LoadingTitle",
  setup() {
    onMounted(() => {
      const h = window.innerHeight;
      console.log(h);
      // eslint-disable-next-line
    const choreographer = new Choreographer({
        animations: [
          {
            range: [h, h * 2],
            selectors: [
              ".P",
              ".e",
              ".r",
              ".s",
              ".o",
              ".n",
              ".a",
              ".l",
              ".i",
              ".f",
              ".y",
            ],
            type: "change",
            style: "color",
            to: "#56BD66",
          },
          {
            range: [-1, h],
            selectors: [".P", ".r", ".o", ".a", ".i", ".f"],
            type: "scale",
            style: "transform:rotateX",
            from: 180,
            to: 90,
            unit: "deg",
          },
          {
            range: [h, h * 2],
            selectors: [".P", ".r", ".o", ".a", ".i", ".f"],
            type: "scale",
            style: "transform:rotateX",
            from: 90,
            to: 0,
            unit: "deg",
          },
          {
            range: [-1, h],
            selectors: [".e", ".s", ".n", ".l", ".y"],
            type: "scale",
            style: "transform:rotateZ",
            from: -180,
            to: -90,
            unit: "deg",
          },
          {
            range: [h, h * 2],
            selectors: [".e", ".s", ".n", ".l", ".y"],
            type: "scale",
            style: "transform:rotateZ",
            from: -90,
            to: 0,
            unit: "deg",
          },
          {
            range: [h / 4, h * 3],
            selector: "#scroll-down",
            type: "change",
            style: "visibility",
            to: "hidden",
          },
          {
            range: [h * 2, h * 3],
            selector: "#logo",
            type: "change",
            style: "text-shadow",
            to: "text-shadow: 0 0 20px darkgreen",
          },
        ],
      });
      window.addEventListener("scroll", function () {
        choreographer.runAnimationsAt(window.pageYOffset);
      });
    });

    return {};
  },
};
</script>

<style scoped>
#box {
  height: 260vh;
  z-index: 0;
}
.container-fluid-top {
  margin-top: 28vh;
  position: fixed;
  z-index: 2;
}
.P,
.r,
.o,
.a,
.i,
.y {
  transform: rotateX(180deg);
}
.e,
.s,
.n,
.l,
.f {
  transform: rotateX(-180deg);
}
</style>
