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
      options.headers.content_type = "application/x-www-form-urlencoded";
      axios(options)
        .then(data => {
          resolve({ valid: true });
        })
        .catch(err => {
          reject({ valid: false });
        });
    });
    return promise;
  }

  _axios(options) {
    let promise = new Promise((resolve, reject) => {
      options.headers = {};
      options.headers.authorization = `${this.authorization}`;
      options.headers.content_type = "application/x-www-form-urlencoded";
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
      reject(`Missing params - ${Param}`);
    });
    return promise;
  }

  account() {
    let options = {
      url: `${this.apiUrl}/games?limit=1`
    };
    return this._testKey(options);
  }

  championships(championship_id, option) {
    let options = {
      url: `${this.apiUrl}/championships/${championship_id}`
    };
    if (option == "matches") options.url = `${options.url}/matches`;
    if (option == "subs") options.url = `${options.url}/subscriptions`;
    return this._axios(options);
  }

  games(offset, limit) {
    let options = {
      url: `${this.apiUrl}/games`
    };
    if (offset) options.url = `${options.url}?offset=${offset}`;
    if (limit) options.url = `${options.url}&limit=${limit}`;
    return this._axios(options);
  }

  gameId(_id) {
    if (!_id) return this._missing("game_id");
    let options = {
      url: `${this.apiUrl}/games`
    };
    return this._axios(options);
  }

  gameParent(_id) {
    let options = {
      url: `${this.apiUrl}/games`
    };
    if (_id) options.url = `${options.url}/${_id}`;
    return this._axios(options);
  }

  hubs(hub_id, option) {
    if (!hub_id) return this._missing("hub_id");
    let options = {
      url: `${this.apiUrl}/hubs/${hub_id}`
    };
    if (option == "matches") options.url = `${options.url}/matches`;
    if (option == "members") options.url = `${options.url}/members`;
    return this._axios(options);
  }

  leaderboards() {
    let options = {
      url: `${this.apiUrl}/hubs/${hub_id}`
    };
    if (option == "matches") options.url = `${options.url}/matches`;
    if (option == "members") options.url = `${options.url}/members`;
    return this._axios(options);
  }

  matches(match_id, stats) {
    if (!match_id) return this._missing("match_id");
    let options = {
      url: `${this.apiUrl}/matches/${match_id}`
    };
    if (stats) options.url = `${options.url}/stats`;
    return this._axios(options);
  }
};
