<template>
  <!-- typed not own component because a bit tedious to do right now -->
  <div id="main" class="container-md pt-5" v-if="!auth_error">
    <div ref="typedStrings" class="mt-5">
      <span style="font-size: 30px" ref="typed"></span>
    </div>
    <p style="font-style: italic">Edit this name</p>
    <input class="text-center" type="text" v-model="nickname" />
    <br />
    <router-link
      to="/character"
      class="btn btn-success bgdarkgreen"
      @click="$store.commit('updateNickName', nickname)"
    >
      Confirm
    </router-link>
  </div>
  <div class="py-3" v-else>
    <ErrorComponent />
  </div>
</template>

<script>
// hopefully won't need a new token at all, since all spotify api calls end here
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import Typed from "typed.js";
import { newConfig } from "@/components/getPost.js";
import {
  getHashParams,
  redirecting,
  checkDomain,
} from "@/components/redirect.js"; // redirect and relogin
import ErrorComponent from "@/components/ErrorComponent.vue";

export default {
  name: "LoggedIn",
  components: { ErrorComponent },
  // using composition api here for consisten js scripting
  setup() {
    const store = useStore(); // vuex store

    store.commit("updateLoginState", true); // making sure login state is true
    checkDomain(); // checking if domain and loginstate are there and true

    // Note: a function of some sort should run in this view (somewhere after userId)
    // that then checks against the firebase db to check for the userId (not sure if a password is needed for this app)
    // assuming that no password is needed, we can then just simply send the user over
    // to something like a next page, in which they can pickup where they last leftoff
    // will most likely need some refactoring, but can get that done at some point with a bit of thinking

    const nickname = ref(""); // reactive nickname ref

    const auth_error = ref(false);

    // typed.js
    const typed = ref(null); // template ref (since using SFC & virtual DOM)
    onMounted(() => {
      // typed.value null if auth_error is true
      // eslint-disable-next-line
      var typing = new Typed(typed.value, {
        // /*html*/ is because Im using es6-string-html extension
        strings: [
          /*html*/
          `Welcome to <span id='logo' class='lightgreen' 
          style='font-size:40px'>Personalify</span>^1000 
          <br> How would you like to be addressed?`,
        ],
        typeSpeed: 20,
        cursorChar: "_",
        startDelay: 1000,
        loop: false,
      });
    });

    const params = getHashParams(); // redirect.js
    // using obj destructuring instead
    const { access_token, state } = params;
    const stateKey = "spotify_auth_state";
    const storedState = localStorage.getItem(stateKey);

    // obtaining current user's data to store as the primary keys for database
    if (access_token && (state == null || state !== storedState)) {
      auth_error.value = true; // ErrorComponent shows
    } else {
      // localStorage.removeItem(stateKey);
      if (access_token) {
        // get user data
        const config = newConfig("GET", `${store.state.spotifyDomain}/me`, {
          auth: `Bearer ${access_token}`,
        });
        axios(config)
          // promises simpler to write than async await in this scenario
          .then((res) => {
            store.commit("updateId", res.data.id); // user id into vuex store
            nickname.value = res.data.display_name; // default nickname based on spotify display_name
          })
          .catch((err) => console.log(err));

        store.dispatch("retrieveGenres", access_token); // gets genres, pass through access_token for api call
        // store.commit("updateToken", access_token); // keeping here just in case
        // store.dispatch("retrieveQuestions"); // keeping here just in case needed later
      }
    }

    return { nickname, auth_error, typed, redirecting };
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
</style>
