import axios from "axios";

// function to decrease number of config statements in main code
export function newConfig(method, url, params = { auth: null, data: null }) {
  const config = {
    method: method,
    headers: { Accept: "application/json" },
    url: url,
  };
  // for spotify authentication
  if (params.auth) config.headers["Authorization"] = params.auth;
  // for firebase putting / posting of data
  if (params.data) config["data"] = params.data;

  return config;
}

// function to decrease the number of try-catch statements in main code
export async function axiosAwait(config) {
  try {
    const res = await axios(config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
