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
api.account().then(data => console.log(data));
```

If you get back a response similar to the below, success!

```json
{
  "APIKey": true
}
```

#### Data API

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
