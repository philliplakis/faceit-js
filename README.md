# STILL IN DEV! Do _NOT_ use yet.

# faceit-js

### A thin wrapper around faceit.com API

### Install

```sh
npm install --save faceit-js
```

### Documentation

In order to use `faceit-js` you will need to generate an API key on the Faceit website. Once you have this, add the library to your project along with your API key like so:

```js
const Faceit = require("faceit-js");
const api = new Faceit(`YOUR_API_KEY`);
```

You can now test that your API key is correct and that everything is working by checking for your account information:

```js
api.account().then((data) => {
  console.log(data);
```

If you get back a response similar to the below, success!

```json
{
  "APIKey": "valid"
}
```

#### Data API

#### Placeholder
