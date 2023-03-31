# node-periodic-execution

[![npm version](https://badge.fury.io/js/periodic-execution.svg)](https://badge.fury.io/js/periodic-execution) ![Node.js CI](https://github.com/TimDaub/node-periodic-execution/workflows/Node.js%20CI/badge.svg)

> A helper that periodically executes a function until a timeout.

node-periodic-execution is a simple node.js function that executes a
function either until it returns an expected value or when a
timeout threshold is reached.

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
const { periodicExecution, TimeoutError } = require("periodic-execution");

const timeout = 1000; // in milliseconds

// Let's check if Google is online
const fn = async () => {
  const res = await fetch("https://google.de");
  return res.status;
};

const fn2 = async () => {
  const res = await fetch("https://google.com");
  return res.status;
};

(async () => {
  const expectedOutcome = 200;
  const options = { interval: 100 };
  await periodicExecution(fn, expectedOutcome, timeout, options);

  const expectedStatus = 500;
  try {
    // NOTE: Let's check if google.com's server throws a 500 status.
    await periodicExecution(fn2, expectedStatus, timeout, options);
  } catch(err) {
    if (err instanceof TimeoutError) {
      console.info(`Wasn't able to retrieve status ${expectedStatus} from URL`);
    }
  }
})();
```

## Changelog

### 0.1.0

- Remove function default export: `const periodicExecution = require...` won't
  work anymore.
- Introduce `TimeoutError`. It's thrown when the timeout threshold has been
  reached.
- Export object with properties `TimeoutError` and `periodicExecution` (see
  Usage section).

### 0.0.1

- Initial release

## License

See [License](./LICENSE).
