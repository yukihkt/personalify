<template>
  <div class="container-fluid bg-dark" id="footer">
    <div class="col-4">
      <div class="ocean" :style="{ backgroundImage: `url(${character_img})` }">
        <div id="wave" :style="{ backgroundImage: `url(${character_img})` }"></div>
      </div>
    </div>
    <div class="col-8"> {{updateProgressBar}}
      <div id="playButtons">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          class="bi bi-skip-start-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.54-.313 1.232.066 1.232.696v7.384c0 .63-.692 1.01-1.232.697L5 8.753V12a.5.5 0 0 1-1 0V4z"
          />
        </svg>
        <div class="playpause">
          <input type="checkbox" value="None" id="playpause" name="check" />
          <label for="playpause" tabindex="1"></label>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          class="bi bi-skip-end-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z"
          />
        </svg>
      </div>
      <div id='bar'></div>
      <div id="progressbar"></div>
      
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "BottomBar",
  props: {
    charId: {
      // supposed to retrieve from firebase..
      type: String,
      default: "1",
    },
    completedQuizzes: {
      type: Number,
      default: 1,
    },
    username: {
      type: String,
      default: "user",
    },
  },
  setup() {
    const store = useStore();
    const character = store.state.character; // character number chosen
    const character_img = require(`@/assets/character/upper_body/${character}.png`);

    return { character_img };
  },
  computed: {
    updateProgressBar() {
      let quiznum = this.completedQuizzes
      console.log(quiznum)
      console.log("inside computed")
      if (quiznum == 2) {
        document.getElementById("progressbar").id = "progressbar2"
        document.getElementById("wave").id = "wave2"
      }
      if (quiznum == 3) {
        document.getElementById("progressbar2").id = "progressbar3"
        document.getElementById("wave2").id = "wave3"
      }
      return ""
    }

  }
  // data() {
  //     return {
  //         flip: true,
  //         pause: "M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28",
  //         play: "M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26"
  //     }

  // },
  // methods: {
  //     changeButton() {
  //         this.flip = !this.flip;
  //         $animation.attr({
  //             "from": this.flip ? this.pause : this.play,
  //             "to": this.flip ? this.play : this.pause
  //         }).get(0).beginElement();
  //     }
  // }
};
</script>
<style scoped>
.playpause label {
  display: block;
  box-sizing: border-box;
  width: 0;
  height: 30px;
  border-color: transparent transparent transparent white;
  transition: 100ms all ease;
  cursor: pointer;
  border-style: double;
  border-width: 0px 0 0px 30px;
}
.playpause input[type="checkbox"] {
  position: absolute;
  left: -9999px;
}
.playpause input[type="checkbox"]:checked + label {
  border-style: solid;
  border-width: 15px 0 15px 30px;
}
.playpause input[type="checkbox"]:focus + label {
  box-shadow: 0 0 5px black;
}

#playButtons {
  position: relative;
  display: flex;
  margin-top: 0.9rem;
  margin-left: 22vw;
  left: 45%;
}

svg {
  margin: 0 10px;
  height: 3em;
  margin-top: -0.6rem;
}

img {
  height: 100px;
  width: 100px;
}
#footer {
    position: fixed;
    z-index: 100;
    /* top: 88vh; */
    bottom: 0;
    height: 5.5rem;
    border-top: rgb(46, 46, 46) 0.5px solid;
}

/* #upperBody {
    width: 300%;
    top: -10vw;
    position: absolute;
} */

#bar {
  margin-left: 22vw;
  overflow: visible;
  z-index: 2;
  background-color: rgb(66, 66, 66);
  border-radius: 4px;
  position: fixed;
  width: 70%;
  bottom: 3%;
  height: 1%;
}
#progressbar {
  margin-left: 22vw;
  overflow: visible;
  z-index: 2;
  background-color: darkgrey;
  border-radius: 4px;
  position: fixed;
  width: 23%;
  bottom: 3%;
  height: 1%;
}

#progressbar2 {
  margin-left: 22vw;
  overflow: visible;
  z-index: 2;
  background-color: darkgrey;
  border-radius: 4px;
  position: fixed;
  width: 46%;
  bottom: 3%;
  height: 1%;
}

#progressbar3 {
  margin-left: 22vw;
  overflow: visible;
  z-index: 2;
  background-color: darkgrey;
  border-radius: 4px;
  position: fixed;
  width: 70%;
  bottom: 3%;
  height: 1%;
}


/* Wave Animation for Progress Bar */
.ocean,
#wave {
  background-size: 70%;
  background-repeat: no-repeat;
}

.ocean {
  z-index: 1;
  position: absolute;
  left: 0.5vw;
  bottom: 0%;
  width: 14vw;
  height: 14vw;
  border: 3px solid white;
  box-shadow: 0 0 0 3px black;
  border-radius: 50%;
  overflow: hidden;
  background-position: 50%;
}
/* 1/3 filled */
#wave {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.1); */
  border-radius: 50%;
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
  background-attachment: fixed;
  background-position: 50%;
}

#wave:before,
#wave:after {
  content: "";
  position: absolute;
  /* adjust below width and height for wave's height */
  /* half of icon will be width: 200% and height: 200% */
  width: 300%;
  height: 300%;
  top: 0;
  left: 50%;
  transform: translate(-50%, -75%);
  /* background-color: rgba(0, 0, 0, 0.5); */
}

#wave:before {
  border-radius: 45%;
  background: rgba (0, 0, 0, 0.1);
  animation: animate 5s linear infinite;
}

#wave:after {
  border-radius: 40%;
  background: rgba(0, 0, 0, 0.5);
  animation: animate 10s linear infinite;
}

@keyframes animate {
  0% {
    transform: translate(-50%, -75%) rotate(0deg);
  }
  0% {
    transform: translate(-50%, -75%) rotate(360deg);
  }
}

/* 2/3 filled */
#wave2:before,
#wave2:after {
  content: "";
  position: absolute;
  /* adjust below width and height for wave's height */
  /* half of icon will be width: 200% and height: 200% */
  width: 200%;
  height: 200%;
  top: 0;
  left: 50%;
  transform: translate(-50%, -75%);
  /* background-color: rgba(0, 0, 0, 0.5); */
}

#wave2:before {
  border-radius: 45%;
  background: rgba (0, 0, 0, 0.1);
  animation: animate 5s linear infinite;
}

#wave2:after {
  border-radius: 40%;
  background: rgba(0, 0, 0, 0.5);
  animation: animate 10s linear infinite;
}

/* fully filled */
#wave3:before,
#wave3:after {
  content: "";
  position: absolute;
  /* adjust below width and height for wave's height */
  /* half of icon will be width: 200% and height: 200% */
  width: 100%;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translate(-50%, -75%);
  /* background-color: rgba(0, 0, 0, 0.5); */
}

#wave3:before {
  border-radius: 45%;
  background: rgba (0, 0, 0, 0.1);
  animation: animate 5s linear infinite;
}

#wave3:after {
  border-radius: 40%;
  background: rgba(0, 0, 0, 0.5);
  animation: animate 10s linear infinite;
}

@media (max-width: 576px) {
  #playButtons {
    left: 34%;
  }
}

@media (max-width: 768px) {
  #playButtons {
    left: 40%;
  }
}

</style>
