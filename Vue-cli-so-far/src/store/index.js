import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { newConfig, axiosAwait } from "@/components/getPost.js";
// eslint-disable-next-line
import { cookieStore, lsStore, sessionStore } from "@/components/vuex/persistedStores.js";
// eslint-disable-next-line
import { defaultState } from "@/components/vuex/defaultState.js";

// reminder to use this import when not in a vue SFC
import router from "../router"; // router imported for router push

export default createStore({
  // persisted state for persisted vuex store in the browser
  plugins: [createPersistedState({ storage: sessionStore() })],
  // state now fully added outside the vuex store file
  state: defaultState(), // can either be {} or defaultState()
  mutations: {
    updateExistingState(state) {
      state.isExisting = true;
    },
    updateLoginState(state) {
      state.isLoggedIn = true;
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
    updatePersonalityAnswers(state, newPersonalityAnswers) {
      state.personalityAnswers = newPersonalityAnswers;
    },
    updatePersonalityResults(state, newPersonalityResults) {
      state.personalityResults = newPersonalityResults;
    },
    updateCareerQuestions(state, newCareerQuestions) {
      state.careerQuestions = newCareerQuestions;
    },
    updateCareerAnswers(state, newCareerAnswers) {
      state.careerAnswers = newCareerAnswers;
    },
    updateCareerResults(state, newCareerResults) {
      state.careerResults = newCareerResults;
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
      const currentDate = Date();
      commit("updateCurrentDate", currentDate);

      const singleDay = 86400; // one day is 86400 seconds
      const timeLimit = 30; // number of days to search back through for spotify api call
      const timeBetween = timeLimit * singleDay;
      const currentTime = Math.floor(Date.now() / 1000);
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

    // retrieved when user lands on /main
    async retrievePersonalityQuiz({ state, commit }) {
      // will only call when personalityQuiz is empty
      const config = newConfig(
        "GET",
        `${state.myDatabase}/quizzes/personalityQuiz.json`
      );
      const db_quiz = await axiosAwait(config);
      // so db_quiz is the object of answers and questions
      if (db_quiz) {
        commit("updatePersonalityQuestions", db_quiz.questions);
        commit("updatePersonalityAnswers", db_quiz.answers);
      } else console.log("Unable to retrieve personality questions");
    },

    async retrieveCareerQuiz({ state, commit }) {
      const config = newConfig(
        "GET",
        `${state.myDatabase}/quizzes/careerQuiz.json`
      );
      const cr_quiz = await axiosAwait(config);
      if (cr_quiz) {
        commit("updateCareerQuestions", cr_quiz.questions);
        commit("updateCareerAnswers", cr_quiz.answers);
      } else console.log("Unable to retrieve career questions");
    },

    async checkDB({ state, commit }) {
      // checking firebase db for the userId
      const config = newConfig(
        "GET",
        `${state.myDatabase}/users/${state.userId}.json`
      );
      const userExists = await axiosAwait(config);

      // if user exists, make sure to commit in the level 0 stuff
      if (userExists) {
        commit("updateExistingState"); // setting to true, since that is the case
        // with the assumption that the user has completed registration
        commit("updateNickName", userExists.nickname);
        commit("updateCharacter", userExists.character);
        commit("updatePersonalityType", userExists.personalityType);
        commit("updatePersonalityResults", userExists.personalityResults);
        commit("updateCareerResults", userExists.careerResults);
        // route user to /main
        router.replace({ path: "/main" });
      }
      // else console.log("Not Found");
    },

    // function to put PUT user into the firebase realtime database
    // specifically, this is to PUT the just registered user's initial data
    // just taking into account what we have coined as our "Level 1" data
    // so using the default null type values for
    async putNewUser({ state }) {
      console.log("adding data for a new user");
      const config = newConfig(
        "PUT",
        `${state.myDatabase}/users/${state.userId}.json`,
        {
          data: {
            // level 0
            nickname: state.nickname,
            character: state.character,
            personalityType: state.personalityType,
            // level 1
            numOfTracks: state.numOfTracks,
            totalMusicFeatures: state.totalMusicFeatures,
            currentDate: state.currentDate,
            // level 2
            personalityResults: state.personalityResults,
            // level 3
            careerResults: state.careerResults,
          },
        }
      );
      const registrationPUT = await axiosAwait(config);
      if (registrationPUT) console.log("Successful Registration");
      else console.log("Unsuccessful Registration");
    },

    // newData = { newKey: newValue }
    async updateInformation({ state }, newData) {
      console.log("updating info for existing user");
      // action to update general information into the firebase db, without needing mutliple actions to do so
      const config = newConfig(
        "PATCH",
        `${state.myDatabase}/users/${state.userId}.json`,
        {
          data: newData,
        }
      );
      const updatedData = await axiosAwait(config);
      if (updatedData) {
        console.log("Data PATCH-ed Successfully!");
        console.log({ updatedData });
      } else console.log("Unable to PATCH data...");
    },
  },
});
