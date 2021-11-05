// default state function which returns the default obj state
export const defaultState = () => {
  return {
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
    character: 0, // character chosen (0 for now since none chosen)
    personalityType: "", // introvert, extrovert or ambivert
    // by default will have all 12 personlity features ready
    totalMusicFeatures: {
      danceability: 0,
      energy: 0,
      key: 0,
      loudness: 0,
      mode: 0,
      speechiness: 0,
      acousticness: 0,
      instrumentalness: 0,
      liveness: 0,
      valence: 0,
      tempo: 0,
      duration_ms: 0,
    }, // music features of the user (instead of evaluating based on music genre)
    numOfTracks: 0, //number of tracks checked for audio features

    // personality quiz
    personalityQuestions: [], // questions object, key: trait, value: qn arr
    personalityResults: {
      agreeableness: 0,
      conscientiousness: 0,
      extroversion: 0,
      neuroticism: 0,
      openness: 0,
    },

    componentOnMain: "", // last component used on main
  };
};
