import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { cookieStore } from "@/components/persistedStores.js";
import { newConfig, axiosAwait } from "@/components/getPost.js";

export default createStore({
  plugins: [createPersistedState({ storage: cookieStore })],
  state: {
    isLoggedIn: false, // if user is logged in or not
    myDomain: "", // web domain
    spotifyDomain: "https://api.spotify.com/v1", // spotify api domain
    timeLimit: 30, // 86400s = 1 day, currently 30 days
    currentDate: "", // current date when user's tracks were checked

    // user-to-store-data
    nickname: "",
    userId: "", // user ID spotify
    genres: [], // genre ids -- arr, cant use keyed collection

    // holding onto in case needed later
    // stateKey: "spotify_auth_state", // localStorage auth key
    // mbtiDomain: "https://personalitytest.herokuapp.com/api/v1", // mbti api
    // auth_token: "", // spotify auth token for current user
    // tracks: {}, // track ids -- obj --> might not need
    // artists: {}, // artist ids -- obj --> might not need
    // questions: [], // list of personality test questions retrieved -- arr (that is the data response)
    // answers: {}, // user-answers to the personality test questions retrieved -- obj (that is the data request requirement)
    // personalityResults: {}, // results object that is returned -- obj (data response from api)
  },
  mutations: {
    updateLoginState(state, isIn) {
      // state.isLoggedIn = true;
      state.isLoggedIn = isIn;
    },
    updateMyDomain(state, newDomain) {
      // domain set when Home load
      state.myDomain = newDomain;
    },
    updateNickName(state, newNick) {
      state.nickname = newNick;
    },
    updateId(state, newId) {
      state.userId = newId;
    },
    updateGenres(state, newGenre) {
      console.log(newGenre);
      if (!(newGenre in state.genres)) state.genres.push(newGenre);
    },
    // old stuff, keeping in case need later
    // updateToken(state, newToken) { state.auth_token = newToken; },
    // updateTracks(state, newTracks) {
    //   if (newTracks in state.tracks) state.tracks[newTracks] += 1;
    //   else state.tracks[newTracks] = 1;
    // },
    // updateArtists(state, newArtist) {
    //   if (newArtist in state.artists) state.artists[newArtist] += 1;
    //   else state.artists[newArtist] = 1;
    // },
    // updateQuestions(state, newQuestions) { state.questions = newQuestions; },
    // updatePersonalityResults(state, newResults) { state.personalityResults = newResults; },
  },
  actions: {
    async retrieveGenres({ state, commit }, auth_token) {
      const singleDay = 86400; // one day is 86400 seconds
      const recentTime =
        Math.floor(Date.now() / 1000) - state.timeLimit * singleDay;

      const config = newConfig(
        "GET",
        `${state.spotifyDomain}/me/player/recently-played?limit=50&after=${recentTime}`,
        { auth: `Bearer ${auth_token}` }
      );
      const tracks = await axiosAwait(config);
      if (tracks) {
        let userArtists = new Set();
        tracks.items.forEach((item) => {
          item.track.artists.forEach((artist) => userArtists.add(artist.id));
        });
        userArtists.forEach(async (id) => {
          let artistConfig = newConfig(
            "GET",
            `${state.spotifyDomain}/artists/${id}`,
            { auth: `Bearer ${auth_token}` }
          );
          let artist = await axiosAwait(artistConfig);
          if (artist)
            artist.genres.forEach((genre) => commit("updateGenres", genre));
          else console.log("Unable to retrieve genres");
        });
      } else console.log("Unable to get tracks");
    },

    // old stuff, will delete later if truly unnecessary
    // async retrieveQuestions({ state, commit }) {
    //   const config = newConfig("GET", `${state.mbtiDomain}/questions`);
    //   const questions = await axiosAwait(config);
    //   if (questions) commit("updateQuestions", questions);
    //   else console.log("Unable to retrieve questions");
    // },
    // async retrieveResults({ state, commit }, location) {
    //   const config = newConfig("POST", `${state.mbtiDomain}/answers`, {
    //     data: { answers: state.answers, location: location },
    //   });
    //   const results = await axiosAwait(config);
    //   if (results) commit("updatePersonalityResults", results);
    //   else console.log("Unable to return results");
    // },
  },
});
