<template>
  <transition name="fade">
    <div class="container py-5" id="header" v-if="shoWelcome">
      Welcome to <span id="logo">Personalify</span>
    </div>
  </transition>
  <div class="d-flex justify-content-center vh-75 align-items-center">
    <div class="row" id="main-area">
      <div
        class="col-4 d-flex flex-column justify-content-between"
        id="left-greet-text"
      >
        <div>
          <transition name="fade">
            <div
              class="d-flex justify-content-start align-items-start"
              v-if="enterTop"
            >
              {{ messages[0] }}
            </div>
          </transition>
        </div>
        <div>
          <transition name="fade">
            <div
              class="d-flex justify-content-center align-items-center"
              v-if="enterMid"
            >
              {{ messages[1] }}
            </div>
          </transition>
        </div>
        <div>
          <transition name="fade">
            <div
              class="d-flex justify-content-start align-items-end"
              v-if="enterBottom"
            >
              {{ messages[2] }}
            </div>
          </transition>
        </div>
      </div>
      <transition name="fade">
        <div class="col-4" id="mid-user-char" v-if="showImg">
          <img :src="character_img" />
        </div>
      </transition>
      <transition name="fade">
        <div
          class="col-4 d-flex align-items-center justify-content-center"
          id="right-personality-btn"
          v-if="showBtns"
        >
          <div>
            Which one are you?
            <div class="row justify-content-center">
              <button class="col-lg-4 m-1 btn btn-primary" @click="btnVert">
                Introvert
              </button>
              <button class="col-lg-4 m-1 btn btn-warning" @click="btnVert">
                Extrovert
              </button>
              <button class="col-lg-4 m-1 btn btn-success" @click="btnVert">
                Ambivert
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { checkDomain } from "@/components/redirect.js";
export default {
  name: "Character",
  setup() {
    const store = useStore();
    const router = useRouter();

    // check if vuex store has current domain, otherwise, path send to home
    checkDomain();

    const character = store.state.character; // character number chosen
    const character_img = require(`@/assets/character/upper_body/${character}.png`);

    const messages = [
      "How was your day?",
      "Just kidding, I don't care.",
      "I'm just getting to know you better!",
    ];

    const shoWelcome = ref(false);
    const showImg = ref(false);

    const enterTop = ref(false);
    const enterMid = ref(false);
    const enterBottom = ref(false);

    const showBtns = ref(false);

    const confirmationBtn = (personalityType) => {
      store.commit("updatePersonalityType", personalityType);
      router.push({ path: "/main" });
    }; // will send users to home page and catalog the personality type chosen

    const btnVert = (e) => {
      const btn = e.currentTarget.classList;
      if (btn.contains("btn-primary")) confirmationBtn("introvert");
      if (btn.contains("btn-warning")) confirmationBtn("extrovert");
      if (btn.contains("btn-success")) confirmationBtn("ambivert");
    };

    onMounted(() => {
      // setTimeout pyramid of hell
      // this page is mostly animation and like 3 btns where the user can only choose 1
      setTimeout(() => {
        shoWelcome.value = true;
        setTimeout(() => {
          showImg.value = true;
          setTimeout(() => {
            enterTop.value = true;
            setTimeout(() => {
              enterMid.value = true;
              setTimeout(() => {
                enterBottom.value = true;
                setTimeout(() => {
                  showBtns.value = true;
                }, 1500); // right button cluster
              }, 1500); // left bottom greeting
            }, 1500); // left middle greeting
          }, 2000); // left top greeting
        }, 1500); // middle img
      }, 1500); // welcome message
    });

    return {
      character_img,
      messages,
      enterTop,
      enterMid,
      enterBottom,
      shoWelcome,
      showImg,
      showBtns,
      btnVert,
    };
  },
};
</script>

<style scoped>
img {
  /* margin-top: 2rem; */
  height: 25rem;
  width: auto;
}
#main-area {
  width: 80%;
  height: 25rem;
}
.btn {
  width: 7rem;
}

/* fade in of the mid character things */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/* right slide fade in/out */
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* general fade stuff, opacity 1 and transition of 1s ease */
.fade-enter-active,
.fade-leave-active,
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-to,
.fade-leave-from,
.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
}
</style>
