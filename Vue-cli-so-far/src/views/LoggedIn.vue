<template>
  <div id="main" class="container-md pt-5" v-if="!auth_error">
    <div ref="typedStrings" class="mt-2">
      <span style="font-size: 30px" ref="typed"></span>
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
          Prev
        </button>
        <button class="btn btn-light" @click="randCharacter">Random</button>
        <button class="sub-btn btn btn-light" @click="nextCharacter">
          Next
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

    store.commit("updateLoginState", true); // making sure login state is true
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
    const typed = ref(null); // template ref (since using SFC & virtual DOM)
    onMounted(() => {
      // typed.value null if auth_error is true
      // eslint-disable-next-line
      var typing = new Typed(typed.value, {
        strings: [
          /*html*/ `Welcome to <span id='logo'>Personalify</span>^600 <br>How would you like to be addressed?`,
        ],
        typeSpeed: 15,
        cursorChar: "|",
        startDelay: 1000,
        loop: false,
        // onComplete: (self) => self.cursor.remove(), // if we decide it is irritating blinking
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
            // something here before the commit operation
            // so instead of a commit, will be a dispatch (vuex action)
            // that checks firebase for the userId, and skips the rest of the things
            // if the user is returning, and perhaps the easiest way is to perhaps throw an error
            // to force a .catch() to break the .then()
            store.commit("updateId", res.data.id); // user id into vuex store
            nickname.value = res.data.display_name; // default nickname based on spotify display_name
            // so that there is a default backup if user puts all spaces in nickname input
            store.commit("updateNickName", res.data.display_name); // committing the nickname

            // due to the nature of the += mutations, an if statement is needed
            // in case of a refresh (this is also due to using persisted state)
            if (store.state.numOfTracks == 0)
              store.dispatch("retrieveGenres", access_token); // access token to retrieve genres
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
        showInput.value = false; // fade out the input area
        setTimeout(() => (showCharacter.value = true), 1100); // delay before fading in character choice
        store.commit("updateNickName", nickname.value); // committing the nickname
      } else {
        alert("Please enter a nickname that isn't empty or simply spaces");
        // reseting the default value when needed
        nickname.value = store.state.nickname;
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

    // retrieval of the personality quiz questions from firebase realtime db
    store.dispatch("retrievePersonalityQuiz");

    //====================================================//

    return {
      nickname, // v-model
      auth_error, // v-if
      typed, // template ref
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
  margin-top: 12px;
}
.sub-btn {
  width: 4.8rem;
  margin: 12px 0.5rem 0;
}
</style>
