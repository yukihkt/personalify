import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
// eslint-disable-next-line
import { cookieStore, lsStore, sessionStore } from "@/components/vuex/persistedStores.js";
import { newConfig, axiosAwait } from "@/components/getPost.js";
// eslint-disable-next-line
import { defaultState } from "@/components/vuex/defaultState.js";

export default createStore({
  // persisted state for persisted vuex store in the browser
  plugins: [createPersistedState({ storage: sessionStore() })],
  // state now fully added outside the vuex store file
  state: defaultState(), // can either be {} or defaultState()
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
    updateCurrentDate(state, newCurrentDate) {
      // in preparation for storing the current date
      state.currentDate = newCurrentDate;
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
    updatePersonalityResults(state, newPersonalityResults) {
      state.personalityResults = newPersonalityResults;
    },
    // the values for personality would be: totalMusicFeatures / numOfTracks
    updateTotalMusicFeatures(state, newMusicFeatures) {
      for (let smf in state.totalMusicFeatures) {
        state.totalMusicFeatures[smf] += newMusicFeatures[smf];
      }
    },
    updateNumOfTracks(state) {
      state.numOfTracks += 1;
    },
  },
  actions: {
    // name is a bit outdated, but we can still roll with it for the time being
    async retrieveGenres({ state, commit }, auth_token) {
      const singleDay = 86400; // one day is 86400 seconds
      // as timeLimit is 30 days, timeBetween is roughly a month
      const timeBetween = state.timeLimit * singleDay;
      const currentTime = Math.floor(Date.now() / 1000);
      const currentDate = new Date();
      commit("updateCurrentDate", currentDate);
      const recentTime = currentTime - timeBetween;

      // retrieving the tracks of the users
      const config = newConfig(
        "GET",
        `${state.spotifyDomain}/me/player/recently-played?limit=50&after=${recentTime}`,
        { auth: `Bearer ${auth_token}` }
      );
      const tracks = await axiosAwait(config);
      // if tracks is retrieved
      if (tracks) {
        // create set for userArtists and also for userTracks
        const userArtists = new Set();
        const userTracks = new Set();

        // for each track object
        tracks.items.forEach((item) => {
          // saving the artist and tracks into respective sets
          userTracks.add(item.track.id);
          item.track.artists.forEach((artist) => userArtists.add(artist.id));
        });

        // audio features -- alternative to genres
        // for every track
        userTracks.forEach(async (id) => {
          const audioConfig = newConfig(
            "GET",
            `${state.spotifyDomain}/audio-features/${id}`,
            { auth: `Bearer ${auth_token}` }
          );
          const features = await axiosAwait(audioConfig);
          if (features) {
            // only want certain parts to be saved
            commit("updateNumOfTracks");
            commit("updateTotalMusicFeatures", features);
          } else {
            console.log("Cant get audio features");
          }
        });
      } else console.log("Unable to get tracks");
    },
    async retrievePersonalityQuiz({ state, commit }) {
      // will only call when personalityQuiz is empty
      const config = newConfig(
        "GET",
        `${state.myDatabase}/quizzes/personalityQuiz/questions.json`
      );
      const db_quiz = await axiosAwait(config);
      if (db_quiz) {
        console.log(db_quiz);
        commit("updatePersonalityQuestions", db_quiz);
      } else console.log("Unable to retrieve personality questions");
    },
  },
});
