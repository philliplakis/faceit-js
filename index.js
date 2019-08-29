"use strict";

const axios = require("axios");
let myAPI_key = require("./config.json").apiKey;
console.log(myAPI_key);
axios.defaults.baseURL = "https://api.example.com";
axios.defaults.headers.common["Authorization"] = Bearer + myAPI_key;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

async function account() {
  try {
    const response = await axios.get("/games");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
