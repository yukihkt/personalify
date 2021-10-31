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
    myDatabase:
      "https://wad2-941f5-default-rtdb.asia-southeast1.firebasedatabase.app",
    timeLimit: 30, // 86400s = 1 day, currently 30 days
    currentDate: "", // current date when user's tracks were checked

    // user-to-store-data
    nickname: "",
    userId: "", // user ID spotify
    genres: {}, // genre ids -- obj, cant use keyed collection like set
    character: 0, // character chosen (0 for now since none chosen)
    personalityType: "", // introvert, extrovert or ambivert

    // personality quiz
    personalityQuestions: {}, // questions object, key: trait, value: qn arr
    personalityResults: {}, // results obj, key: trait, value: points
  },
  mutations: {
    updateLoginState(state, isIn) {
      state.isLoggedIn = isIn;
    },
    updateMyDomain(state, newDomain) {
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
      state.genres[newGenre] = 0; // check for newGenre in state.genres doesn't work, doesn't really check it, and I can't find why
    },
    updateCharacter(state, newCharacter) {
      state.character = newCharacter;
    },
    updatePersonalityType(state, newPersonalityType) {
      state.personalityType = newPersonalityType;
    },
    updatePersonalityQuestions(state, newPersonalityQuestions) {
      state.personalityQuestions = newPersonalityQuestions;
    },
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
  },
});
