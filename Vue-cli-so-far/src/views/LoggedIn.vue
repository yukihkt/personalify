<template>
  <div id="main" class="container-md pt-5" v-if="!auth_error">
    <div class="mt-2">
      <span style="font-size: 30px" ref="typed"></span>
      <transition name="fade">
        <span v-if="showTyped2" style="font-size: 30px" ref="typed_2"></span>
      </transition>
    </div>

    <!-- delayed fade in of the nickname input area -->
    <transition name="fade">
      <div v-if="showInput">
        <p style="font-style: italic">Edit this name</p>
        <input class="text-center" type="text" v-model="nickname" />
        <br />
        <button
          @click="showCharacterBtn"
          class="main-btn btn btn-success bgdarkgreen"
        >
          Confirm
        </button>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="showCharacter">
        <img :src="character_img" id="displayed-character" />
        <br />
        <button class="sub-btn btn btn-light" @click="prevCharacter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            fill="currentColor"
            class="bi bi-skip-start-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.54-.313 1.232.066 1.232.696v7.384c0 .63-.692 1.01-1.232.697L5 8.753V12a.5.5 0 0 1-1 0V4z"
            />
          </svg>
        </button>
        <button class="btn btn-light" @click="randCharacter" id="randBtn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-shuffle"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"
            />
            <path
              d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"
            />
          </svg>
        </button>
        <button class="sub-btn btn btn-light" @click="nextCharacter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            fill="currentColor"
            class="bi bi-skip-end-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z"
            />
          </svg>
        </button>
        <br />

        <router-link
          to="/character"
          class="main-btn btn btn-success bgdarkgreen"
          @click="confirmCharacter"
        >
          Confirm
        </router-link>
      </div>
    </transition>
  </div>

  <div class="py-3" v-else>
    <ErrorComponent />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import Typed from "typed.js";
import { newConfig } from "@/components/getPost.js";
import {
  getHashParams,
  redirecting,
  checkDomain,
  rng,
} from "@/components/redirect.js"; // redirect and relogin
import ErrorComponent from "@/components/ErrorComponent.vue";

export default {
  name: "LoggedIn",
  components: { ErrorComponent },
  setup() {
    const store = useStore(); // vuex store

    store.commit("updateLoginState"); // updating login state to true
    checkDomain(); // checking if domain and loginstate are there and true

    // default set in auth_checking section
    const nickname = ref(""); // reactive nickname ref

    //====================================================//
    /**
     * Typewriter styled welcome message for first time users of Personalify
     * @displays Welcome message with a typing effect
     * @delays the fade in of the nickname input and confirmation button
     */
    const showInput = ref(false); // reactive control of when input shows
    const showTyped2 = ref(true);
    const typed = ref(null); // template ref (since using SFC & virtual DOM)
    const typed_2 = ref(null); // template ref for typed2
    onMounted(() => {
      // typed.value null if auth_error is true
      // eslint-disable-next-line
      const typing = new Typed(typed.value, {
        strings: [/*html*/ `Welcome to <span id='logo'>Personalify</span>`],
        typeSpeed: 15,
        cursorChar: "_",
        startDelay: 1000,
        loop: false,
        onComplete: (self) => self.cursor.remove(), // if we decide it is irritating blinking
      });
      // eslint-disable-next-line
      const typing_2 = new Typed(typed_2.value, {
        strings: [/*html*/ `<br>How would you like to be addressed?`],
        typeSpeed: 15,
        cursorChar: "_",
        startDelay: 2400,
        loop: false,
        onComplete: (self) => self.cursor.remove(), // if we decide it is irritating blinking
      });
      setTimeout(() => (showInput.value = true), 4500);
    });

    //====================================================//
    /**
     * user details from the URI component
     * @retrieve user genres and id, also uses their display_name
     * to act as the default nickname the user can change
     */

    // if the auth_err is true, then the error component renders instead
    const auth_error = ref(false);

    const params = getHashParams(); // redirect.js
    // using obj destructuring instead
    const { access_token, state } = params;
    const stateKey = "spotify_auth_state";
    const storedState = localStorage.getItem(stateKey);
    let storedNick;

    // obtaining current user's data to store as the primary keys for database
    if (access_token && (state == null || state !== storedState)) {
      auth_error.value = true; // ErrorComponent shows
      store.commit("updateMyDomain", window.location.origin); // so reauth doesn't return an error
    } else {
      // localStorage.removeItem(stateKey);
      if (access_token) {
        // get user data
        const config = newConfig("GET", `${store.state.spotifyDomain}/me`, {
          auth: `Bearer ${access_token}`,
        });
        axios(config)
          .then((res) => {
            store.commit("updateId", res.data.id); // user id into vuex store
            if (store.state.numOfTracks == 0)
              store.dispatch("retrieveGenres", access_token);
            // retrieving new music genre and feature data every login
            // since user may listen to new music every so often
            store.dispatch("checkDB");
            // due to the nature of the += mutations, an if statement is needed
            // in case of a refresh (this is also due to using persisted state)
            nickname.value = res.data.display_name; // default nickname based on spotify display_name
            storedNick = res.data.display_name; // storing a default in case the user attempts to use all spaces
          })
          .catch((err) => console.log(err));
      }
    }

    //====================================================//
    /**
     * user details from the URI component
     * @retrieve user genres and id, also uses their display_name
     * to act as the default nickname the user can change
     */
    const showCharacter = ref(false);
    const showCharacterBtn = () => {
      // as long as nickname chosen isn't all spaces
      if (nickname.value.trim() != "") {
        showTyped2.value = false;
        showInput.value = false; // fade out the input area
        setTimeout(() => (showCharacter.value = true), 1100); // delay before fading in character choice
        store.commit("updateNickName", nickname.value); // committing the nickname
      } else {
        alert("Please enter a nickname that isn't empty or simply spaces");
        // reseting the default value when needed
        nickname.value = store.state.nickname;
        nickname.value = storedNick;
      }
    };

    const MAX_CHAR_NUM = 36; // max 36 img
    const MIN_CHAR_NUM = 1; // first img has id of 1
    let char_num = MIN_CHAR_NUM; // no need to be reactive
    // require needed because assets aren't dynamically loaded like views and components
    // assets are a static file, so they are compiled differently
    const character_img = ref(
      require(`@/assets/character/upper_body/${char_num}.png`)
    ); // img must be reactive here

    // experimental new idea for buttons here instead
    const newCharacter = () =>
      (character_img.value = require(`@/assets/character/upper_body/${char_num}.png`));

    const prevCharacter = () => {
      if (char_num != MIN_CHAR_NUM) char_num--;
      else char_num = MAX_CHAR_NUM;
      newCharacter();
    };
    const nextCharacter = () => {
      if (char_num != MAX_CHAR_NUM) char_num++;
      else char_num = MIN_CHAR_NUM;
      newCharacter();
    };
    const randCharacter = () => {
      char_num = rng(char_num, MIN_CHAR_NUM, MAX_CHAR_NUM);
      newCharacter();
    };

    const confirmCharacter = () => store.commit("updateCharacter", char_num);

    //====================================================//

    return {
      nickname, // v-model
      auth_error, // v-if
      typed, // template ref
      typed_2, // template ref
      showTyped2, // template ref
      redirecting, // onclick
      character_img, // :src
      prevCharacter, // new character select btn
      nextCharacter, // new character select btn
      randCharacter, // new random select btn
      showInput, // v-if
      showCharacter, // v-if
      showCharacterBtn, // onclick
      confirmCharacter, // confirming the character and routing
    };
  },
};
</script>

<style scoped>
h2 {
  color: white;
  font-weight: 500;
}

p {
  color: lightgray;
  margin-bottom: 5px;
}

input {
  width: 50%;
  height: 2.5rem;
  margin-bottom: 15px;
  text-align: center;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

img#displayed-character {
  margin-top: 2rem;
  height: 25rem;
  width: auto;
}

.btn {
  margin: 15px;
  background-color: #56bd66;
  color: black;
  border: 1px solid #56bd66;
}

.btn:hover {
  background-color: #218c31;
}

.sub-btn {
  width: 3rem;
  height: 3rem;
  margin: 5px 0.5rem 0;
  border: 1px solid #218c31;
  border-radius: 50%;
  background-color: transparent;
  text-align: center;
}

svg {
  color: white;
}

#randBtn {
  border-radius: 50%;
  background-color: #218c31;
  width: 4rem;
  height: 4rem;
  border: 2px solid #218c31;
}

.sub-btn:hover,
#randBtn:hover {
  box-shadow: 0 0 30px 10px lightgreen; /* outer cyan */
  transition: 0.3s ease-in-out;
}
</style>
