### STILL IN DEV! - If its documented its working!

# faceit-js

![Faceit Logo](https://i.imgur.com/fnbEDhd.jpg)

### A thin wrapper around faceit.com API for Node.JS

_note: this is not an Official Faceit Package!_

### Install

```sh
npm install faceit-js
```

### Documentation

#### Setting Up

In order to use `faceit-js` you will need to generate an API key on the Faceit website. Once you have this, add the library to your project along with your API key like so:

```js
const Faceit = require("faceit-js");
const api = new Faceit(`YOUR_API_KEY`);
```

You can now test that your API key is correct and that everything is working by checking for your account information:

```js
api.account().then(data => console.log(data));
```

If you get back a response similar to the below, success! If a `false` is returned, Your API key is invalid.

```json
{ "valid": true }
```

#### Data API

The Data API is fully covered by faceit-js, The official documentation can be found here: https://developers.faceit.com/docs/tools/data_api, All requests are Promise based, dont forget to `catch` any errors.

##### championships(championship_id, options, limit):

| Argument        | Type   | Value                                  | Required |
| --------------- | ------ | -------------------------------------- | -------- |
| championship_id | String | The id of the championship             | **true** |
| options         | String | "matches", "subs", "organizer", "game" | false    |
| limit           | Int    | Default = 20                           | false    |

```js
api
  .championships("e32fb861-c3e0-4cbe-a88d-68795af155df")
  .then(data => console.log(data));

// Retreive the Championships matches and limit results to 1.
api
  .championships("e32fb861-c3e0-4cbe-a88d-68795af155df", "matches", 1)
  .then(data => console.log(data))
  .catch(err => {
    console.log(err);
  });
```

#### games(limit, offset):

| Argument | Type | Required |
| -------- | ---- | -------- |
| limit    | Int  | false    |
| offset   | Int  | false    |

```js
api.games().then(data => console.log(data));

// This limits your results to only 1.
api.games(1).then(data => console.log(data));

// This Offsets your result by 5, & limits your results to only 1.
// If you want to Offset, You must limit.
api
  .games(1, 5)
  .then(data => console.log(data))
  .catch(err => {
    console.log(err);
  });
```

#### game(game_id, parent):

| Argument | Type    | Value              | Required |
| -------- | ------- | ------------------ | -------- |
| game_id  | String  | The id of the game | **true** |
| parent   | Boolean | true               | false    |

```js
api
  .game("csgo", true)
  .then(data => console.log(data))
  .catch(err => {
    console.log(err);
  });
```

#### hubs(hub_id, options):

| Argument | Type   | Value                                           | Required |
| -------- | ------ | ----------------------------------------------- | -------- |
| hub_id   | String | The id of the hub                               | **true** |
| options  | String | "matches", "members", "roles", "rules", "stats" | false    |

```js
api
  .hubs("748cf78c-be73-4eb9-b131-21552f2f8b75")
  .then(data => console.log(data))
  .catch(err => {
    console.log(err);
  });

// To get all members:
api
  .hubs("748cf78c-be73-4eb9-b131-21552f2f8b75", "members")
  .then(data => console.log(data))
  .catch(err => {
    console.log(err);
  });
```

#### leaderboards({query}):

| Argument | Type   | Value                                   | Required |
| -------- | ------ | --------------------------------------- | -------- |
| query    | Object |                                         | **true** |
| .\_id    | String | The id of the leaderboard or .option id | **true** |
| .option  | String | "championships", "hubs"                 | false    |
| .group   | Int    | A group of the championship             | false    |
| .season  | Int    | A season of the hub                     | false    |

```js
// to get a specific leaderboard:
let query = {};
query._id = "5bad03dc67dc0e000652f9d9";
api
  .leaderboards(query)
  .then(data => console.log(data))
  .catch(err => {
    console.log(err);
  });

// To query a specific Championship leaderboard:
let query = {};
query._id = "e32fb861-c3e0-4cbe-a88d-68795af155df";
query.option = "championships";
api
  .leaderboards(query)
  .then(data => console.log(data))
  .catch(err => {
    console.log(err);
  });

// To query a specific Championship Group leaderboard:
let query = {};
query._id = "e32fb861-c3e0-4cbe-a88d-68795af155df";
query.option = "championships";
query.group = 2;
api
  .leaderboards(query)
  .then(data => console.log(data))
  .catch(err => {
    console.log(err);
  });
```

#### matches(match_id, stats):

| Argument | Type    | Value               | Required |
| -------- | ------- | ------------------- | -------- |
| match_id | String  | The id of the match | **true** |
| stats    | Boolean | true                | false    |

```js
api
  .matches("1-f2dd4ac7-27a3-42ed-aa16-15d60dbcbe29")
  .then(data => console.log(data));

// If you want the stats, Add true as an argument
api
  .matches("1-f2dd4ac7-27a3-42ed-aa16-15d60dbcbe29", true)
  .then(data => console.log(data))
  .catch(err => {
    console.log(err);
  });
```

#### organizers(organizers_id):

> coming soon

#### nickname(name):

| Argument | Type   | Value                            | Required |
| -------- | ------ | -------------------------------- | -------- |
| name     | String | The name of the player on Faceit | **true** |

```js
api.nickname("shroud").then(data => console.log(data));
```

#### players(player_id, options, stats):

| Argument  | Type   | Value                                     | Required                          |
| --------- | ------ | ----------------------------------------- | --------------------------------- |
| player_id | String | The id of the player                      | **true**                          |
| options   | String | "history", "hubs", "tournaments", "stats" | false                             |
| game      | String | The id of the game                        | **true** if (_options_ = "stats") |

```js
api
  .players("803dbe7e-e9f8-4f0f-8221-c441c26bbb41")
  .then(data => console.log(data))
  .catch(err => {
    console.log(err);
  });
// Get the users history:
api
  .players("803dbe7e-e9f8-4f0f-8221-c441c26bbb41", "history")
  .then(data => console.log(data))
  .catch(err => {
    console.log(err);
  });
// Get specific game stats:
api
  .players("803dbe7e-e9f8-4f0f-8221-c441c26bbb41", "stats", "csgo")
  .then(data => console.log(data))
  .catch(err => {
    console.log(err);
  });
```

#### rankings(game_id, region, player_id)

| Argument  | Type   | Value                | Required |
| --------- | ------ | -------------------- | -------- |
| game_id   | String | The id of the game   | **true** |
| region    | String | A region of a game   | **true** |
| player_id | String | The id of the player | false    |

```js
api
  .rankings("csgo", "NA")
  .then(data => console.log(data))
  .catch(err => {
    console.log(err);
  });

// To get a players ranking simply add there ID.
api
  .rankings("csgo", "NA", "803dbe7e-e9f8-4f0f-8221-c441c26bbb41")
  .then(data => console.log(data))
  .catch(err => {
    console.log(err);
  });
```

#### search():

> coming soon

#### teams():

> coming soon

#### tournaments():

> coming soon

### Async / Await

An example in using Async & Await with Express.js is below:

```js
app.post("/faceit/nickname", async (req, res) => {
  let user = await api.nickname(req.body.nickname);
  if (!user) return res.status(400).send("Could not find Nickname!");
  res.status(200).json({ user });
});
```

### Issues

Please raise an issue on GitHub with as much information as possible and the steps to replicate (if possible).

### License

The MIT License (MIT)

Copyright (c) 2019 Phillip Lakis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
