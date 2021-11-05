<template>
  <div id="box" class="col-12 d-flex justify-content-center">
    <div class="container-fluid-top">
      <div id="logo">
        <span class="P" ref="P">P</span>
        <span class="e" ref="E">e</span>
        <span class="r" ref="R">r</span>
        <span class="s" ref="S">s</span>
        <span class="o" ref="O">o</span>
        <span class="n" ref="N">n</span>
        <span class="a" ref="A">a</span>
        <span class="l" ref="L">l</span>
        <span class="i" ref="I">i</span>
        <span class="f" ref="F">f</span>
        <span class="y" ref="Y">y</span>
      </div>
      <div class="text-center col-12" ref="scroll_down" style="color: gray">
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
import { ref, onMounted } from "vue";

export default {
  name: "LoadingTitle",
  setup() {
    // template refs for selectors
    // wondering if there is a better way to do this...
    const P = ref(null);
    const E = ref(null);
    const R = ref(null);
    const S = ref(null);
    const O = ref(null);
    const N = ref(null);
    const A = ref(null);
    const L = ref(null);
    const I = ref(null);
    const F = ref(null);
    const Y = ref(null);

    const scroll_down = ref(null);

    onMounted(() => {
      console.log(P.value);
      console.log(E.value);
      console.log(R.value);
      console.log(S.value);
      console.log(O.value);
      console.log(N.value);
      console.log(A.value);
      console.log(L.value);
      console.log(I.value);
      console.log(F.value);
      console.log(Y.value);
      console.log(scroll_down.value);
      const h = window.innerHeight;
      // eslint-disable-next-line
    const choreographer = new Choreographer({
        animations: [
          {
            range: [h, h * 2],
            selectors: [
              P.value,
              E.value,
              R.value,
              S.value,
              O.value,
              N.value,
              A.value,
              L.value,
              I.value,
              F.value,
              Y.value,
            ],
            type: "change",
            style: "color",
            to: "#56BD66",
          },
          {
            range: [-1, h],
            selectors: [P.value, R.value, O.value, A.value, I.value, F.value],
            type: "scale",
            style: "transform:rotateX",
            from: 180,
            to: 90,
            unit: "deg",
          },
          {
            range: [h, h * 2],
            selectors: [P.value, R.value, O.value, A.value, I.value, F.value],
            type: "scale",
            style: "transform:rotateX",
            from: 90,
            to: 0,
            unit: "deg",
          },
          {
            range: [-1, h],
            selectors: [E.value, S.value, N.value, L.value, Y.value],
            type: "scale",
            style: "transform:rotateZ",
            from: -180,
            to: -90,
            unit: "deg",
          },
          {
            range: [h, h * 2],
            selectors: [E.value, S.value, N.value, L.value, Y.value],
            type: "scale",
            style: "transform:rotateZ",
            from: -90,
            to: 0,
            unit: "deg",
          },

          // Hide the "scroll down" letters after users scroll down
          {
            range: [h / 4, h * 3],
            selector: scroll_down.value,
            type: "change",
            style: "visibility",
            to: "hidden",
          },

          // Make link appear at the end of the page
          // NOT DONE: to add some smooth animation here in future
          {
            range: [h * 2, h * 3],
            selector: "a",
            type: "change",
            style: "visibility",
            to: "visible",
          },

          // Make logo glow at the end of the page
          {
            range: [h * 2, h * 3],
            selector: "logo",
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

    return { P, E, R, S, O, N, A, L, I, F, Y, scroll_down };
  },
};
</script>

<style scoped>
span {
  font-size: 80px;
}
#box {
  /* margin: 0; */
  /* background-color: #181818; */
  height: 150vh;
}
.container-fluid-top {
  margin-top: 36vh;
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
