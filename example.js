const Faceit = require("./lib");
let myAPI_key = require("./config.json").apiKey;

const fi = new Faceit(myAPI_key);

//fi.account().then(data => console.log(data));

// fi.championships("e32fb861-c3e0-4cbe-a88d-68795af155df", "organizer")
//   .then(data => console.log(data))
//   .catch(err => {
//     console.log(err);
//   });

// fi.games()
//   .then(data => console.log(data))
//   .catch(err => {
//     console.log(err);
//   });

// fi.gameById("csgo", true)
//   .then(data => console.log(data))
//   .catch(err => {
//     console.log(err);
//   });

// fi.hubs("748cf78c-be73-4eb9-b131-21552f2f8b75", "members")
//   .then(data => console.log(data))
//   .catch(err => {
//     console.log(err);
//   });

// fi.leaderboards()
//   .then(data => console.log(data))
//   .catch(err => {
//     console.log(err);
//   });

// fi.matches("1-9ac606cd-557e-45f6-97b3-48acb15e7b96")
//   .then(data => console.log(data))
//   .catch(err => {
//     console.log(err);
//   });

// fi.organizers()
//   .then(data => console.log(data))
//   .catch(err => {
//     console.log(err);
//   });

// fi.nickname("shroud")
//   .then(data => console.log(data))
//   .catch(err => {
//     console.log(err);
//   });

// fi.rankings("csgo", "NA", "803dbe7e-e9f8-4f0f-8221-c441c26bbb41")
//   .then(data => console.log(data))
//   .catch(err => {
//     console.log(err);
//   });

// fi.organizers()
//   .then(data => console.log(data))
//   .catch(err => {
//     console.log(err);
//   });

let query = {};
query._id = "e32fb861-c3e0-4cbe-a88d-68795af155df";
query.option = "championships";
query.group = 2;
fi.leaderboards(query)
  .then(data => console.log(data))
  .catch(err => {
    console.log(err);
  });
