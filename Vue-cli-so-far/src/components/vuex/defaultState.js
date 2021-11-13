// default state function which returns the default obj state
export const defaultState = () => {
  return {
    // data that is not stored on firebase
    isExisting: false,
    isLoggedIn: false, // if user is logged in or not
    myDomain: "", // web domain
    spotifyDomain: "https://api.spotify.com/v1", // spotify api domain
    myDatabase:
      "https://wad2-941f5-default-rtdb.asia-southeast1.firebasedatabase.app",
    // personality quiz
    personalityQuestions: [], // questions object, key: trait, value: qn arr
    personalityAnswers: {}, // answers retrieved from db
    // careerQuiz
    careerQuestions: [],
    careerAnswers: {},

    // user-to-store-data (ordered here in terms of ideal levelling)
    // level 0
    userId: "", // user ID spotify
    nickname: "",
    character: 0, // character chosen (0 for now since none chosen)
    personalityType: "", // introvert, extrovert or ambivert
    // level 1
    numOfTracks: 0, //number of tracks checked for audio features
    totalMusicFeatures: {
      danceability: 0, // float -- 0 to 1
      energy: 0, // float -- 0 to 1
      speechiness: 0, // float -- 0 to 1
      acousticness: 0, // float --  0 to 1
      instrumentalness: 0, // float -- 0 to 1
      liveness: 0, // float -- 0 to 1
      valence: 0, // float -- 0 to 1
      // weird float
      loudness: 0, // float -- -60db and beyond (around 0db)
      tempo: 0, // float -- beats per minute
      duration_ms: 0, // integer -- milliseconds, divide 1000 for seconds, divide another 60 for minutes
      // integers
      key: 0, // integer -- pitch class notation
      mode: 0, // only can be 0 or 1 integers, for minor
    },
    currentDate: "", // current date when user's tracks were checked
    // level 2
    personalityResults: "",
    // level 3
    careerResults: "",
  };
};
