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
