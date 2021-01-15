"use strict";

const axios = require("axios");

module.exports = class Faceit {
  constructor(token) {
    this.authorization = `Bearer ${token}`;
    this.apiUrl = "https://open.faceit.com/data/v4";
  }

  _testKey(options) {
    let promise = new Promise((resolve, reject) => {
      options.headers = {};
      options.headers.authorization = `${this.authorization}`;
      options.headers.content_type = "application/json";
      axios(options)
        .then(data => {
          resolve({ valid: true });
        })
        .catch(err => {
          resolve({ valid: false });
        });
    });
    return promise;
  }

  _Send(options) {
    let promise = new Promise((resolve, reject) => {
      options.headers = {};
      options.headers.authorization = `${this.authorization}`;
      options.headers.content_type = "application/json";
      axios(options)
        .then(data => {
          resolve(data.data);
        })
        .catch(err => {
          reject(err);
        });
    });
    return promise;
  }

  _missing(Param) {
    let promise = new Promise((resolve, reject) => {
      reject(`ERROR: Missing params - ${Param}`);
    });
    return promise;
  }

  account() {
    let options = {
      url: `${this.apiUrl}/games?limit=1`
    };
    return this._testKey(options);
  }

  championships(championship_id, option, limit) {
    if (!limit) limit = 20;
    if (!championship_id) return this._missing("championship_id");
    let options = {
      url: `${this.apiUrl}/championships/${championship_id}`
    };
    if (option == "matches") options.url = `${options.url}/matches`;
    if (option == "subs") options.url = `${options.url}/subscriptions`;
    if (option == "game") options.url = `${options.url}?expanded=game`;
    if (option == "organizer")
      options.url = `${options.url}?expanded=organizer`;
    options.url = `${options.url}?offset=0&limit=${limit}`;
    return this._Send(options);
  }

  games(limit, offset) {
    if (!limit) limit = 20;
    if (!offset) offset = 0;
    let options = {
      url: `${this.apiUrl}/games?offset=${offset}&limit=${limit}`
    };
    console.log(options);
    return this._Send(options);
  }

  game(_id, option) {
    if (!_id) return this._missing("game_id");
    let options = {
      url: `${this.apiUrl}/games/${_id}`
    };
    if (option) options.url = `${options.url}/parent`;
    return this._Send(options);
  }

  hubs(hub_id, option) {
    if (!hub_id) return this._missing("hub_id");
    let options = {
      url: `${this.apiUrl}/hubs/${hub_id}`
    };
    if (option == "matches") options.url = `${options.url}/matches`;
    if (option == "members") options.url = `${options.url}/members`;
    if (option == "roles") options.url = `${options.url}/roles`;
    if (option == "rules") options.url = `${options.url}/rules`;
    if (option == "stats") options.url = `${options.url}/stats`;
    return this._Send(options);
  }

  leaderboards(query) {
    let options = {};
    if (!query) return this._missing("Query is missing for Leaderboards");
    if (query.option == "championships") {
      if (!query._id) return this._missing("championships_id");
      options.url = `${this.apiUrl}/leaderboards/championships/${query._id}`;
      if (query.group) options.url = `${options.url}/groups/${query.group}`;
    } else if (query.option == "hubs") {
      if (!query._id) return this._missing("hubs_id");
      options.url = `${this.apiUrl}/leaderboards/hubs/${query._id}`;
      if (query.season) options.url = `${options.url}/groups/${query.season}`;
    } else {
      if (!query._id) return this._missing("leaderboard_id");
      options.url = `${this.apiUrl}/leaderboards/${query._id}`;
    }
    return this._Send(options);
  }

  matches(match_id, stats) {
    if (!match_id) return this._missing("match_id");
    let options = {
      url: `${this.apiUrl}/matches/${match_id}`
    };
    if (stats) options.url = `${options.url}/stats`;
    return this._Send(options);
  }

  organizers(organizers_id, s, option, type) {
    let options = {
      url: `${this.apiUrl}/organizers`
    };
    if (organizers_id) options.url = `${options.url}/${organizers_id}`;
    if (option == "championships") options.url = `${options.url}/championships`;
    if (option == "games") options.url = `${options.url}/games`;
    if (option == "hubs") options.url = `${options.url}/hubs`;
    if (option == "tournaments")
      options.url = `${options.url}/tournaments?type=${type}`;
    if (limit) options.url = `${options.url}?limit=${limit}`;
    return this._Send(options);
  }

  nickname(nickname) {
    if (!nickname) return this._missing("nickname");
    let options = {
      url: `${this.apiUrl}/players?nickname=${nickname}`
    };
    return this._Send(options);
  }

  players(player_id, option, game, limit) {
    if (!player_id) return this._missing("player_id");
    let options = {
      url: `${this.apiUrl}/players/${player_id}`
    };
    if (option == "history") options.url = `${options.url}/history${limit ? `?limit=${limit}` : ''}`;
    if (option == "hubs") options.url = `${options.url}/hubs`;
    if (option == "tournaments") options.url = `${options.url}/tournaments`;
    if (option == "stats") {
      if (!game) return this._missing("You must supply a Game ID.");
      options.url = `${options.url}/stats/${game}`;
    }
    return this._Send(options);
  }

  rankings(game_id, region, player_id) {
    if (!game_id && region)
      return this._missing("Game Id & regoin. Rankings needs both!");
    let options = {
      url: `${this.apiUrl}/rankings/games/${game_id}/regions/${region}`
    };
    if (player_id) options.url = `${options.url}/players/${player_id}`;
    return this._Send(options);
  }

  search() {
    let options = {
      url: `${this.apiUrl}/search/championships`
    };
    return this._Send(options);
  }

  teams() {
    let options = {
      url: `${this.apiUrl}/teams/{team_id}`
    };
    return this._Send(options);
  }

  tournaments() {
    let options = {
      url: `${this.apiUrl}//tournaments`
    };
    return this._Send(options);
  }
};
