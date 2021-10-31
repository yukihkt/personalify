// functions related to redirecting the user from one page to another
// for various reasons

import router from "../router"; // router imported for router push
import store from "../store"; // store imported to use here

// adding the getHashParams() function here to reduce clutter
// spotify implicit grant flow, retrieves data parameters from URI Component
export const getHashParams = () => {
  // directly copied from spotify's example auth repo
  let hashParams = {};
  let e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

// redirect function for user Authentication
const generateRandomString = (length) => {
  // random string for redirect method
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const redirecting = () => {
  const stateKey = "spotify_auth_state";
  const client_id = "b3f66bd5eeb545279f225a5f96659557";
  const redirect_uri = `${store.state.myDomain}/authenticated`;

  let state = generateRandomString(16); // this component's generateRandomString function
  localStorage.setItem(stateKey, state); // setting localStorage with statekey and state data random string, to verify authentication later
  const scope = "user-read-private user-read-email user-read-recently-played"; // scope of data reading from the URI later in the authentication

  let url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += "&client_id=" + encodeURIComponent(client_id);
  url += "&scope=" + encodeURIComponent(scope);
  url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
  url += "&state=" + encodeURIComponent(state);

  window.location = url; // redirecting user when login btn is pressed
};

export const checkDomain = () => {
  // check if vuex store has current domain, otherwise, path send to home
  if (store.state.myDomain == "" || !store.state.isLoggedIn) {
    router.replace({ path: "/" });
  }
};

export const rng = (currChar, min, max) => {
  let newChar = currChar;
  // char can be min - max, random() provides random num from 0 - <1
  // floor is more consistent than ceil (what if num is just 0)
  // + 1 to make sure it works with the numbers we need
  while (currChar == newChar) newChar = Math.floor(Math.random() * max) + min;
  return newChar;
};
