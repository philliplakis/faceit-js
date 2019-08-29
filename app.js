const Faceit = require("./index.js");
let myAPI_key = require("./config.json").apiKey;

const api = new Faceit(myAPI_key);

// api
//   .matches()
//   .then(data => console.log(data))
//   .catch(err => {
//     console.log(err);
//   });

api.account().then(data => console.log(data));
