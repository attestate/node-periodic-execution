// @format
const { hrtime } = require("process");

let defaultOptions = {
  interval: 1000
};

class TimeoutError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TimeoutError);
    }

    this.name = "TimeoutError";
  }
}

async function periodicExecution(fn, expected, timeout, options) {
  options = { ...defaultOptions, ...options };

  return new Promise(async (resolve, reject) => {
    const start = hrtime.bigint();
    let outcome;
    // NOTE: hrtime.bigint() is in nano seconds, which is 1e-6 apart from milli
    // seconds
    while (Number(hrtime.bigint() - start) / (1000 * 1000) < timeout) {
      outcome = await fn();
      if (outcome === expected) {
        return resolve(outcome);
      }

      await new Promise(resolve => setTimeout(resolve, options.interval));
    }

    return reject(
      new TimeoutError(
        `Execution didn't reach expected result. Outcome: "${outcome}"`
      )
    );
  });
}

module.exports = {
  periodicExecution,
  TimeoutError
};
