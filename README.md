# node-periodic-execution

> A helper that periodically executes a function until a timeout.

## Requirements

node-periodic-execution uses node's `process.hrtime` for time-keeping, hence a
node.js environment is required.

## Installation

```bash
$ npm i --save periodic-execution
```

## Usage

```js
const fetch = require("cross-fetch");
const periodicExecution = require("periodic-execution");

// Let's check if Google is online
const fn = async () => {
  const res = await fetch("https://google.de");
  return res.statusCode;
};

(async () => {
  await periodicExecution(fn, 201, 1000, { interval: 100 });
})();
```

## License

See [License](./LICENSE).
