// @format
const { hrtime } = require("process");

let defaultOptions = {
  interval: 1000
};

async function periodicExecution(fn, expected, timeout, options) {
  options = { ...defaultOptions, ...options };

  return new Promise(async result => {
    const start = hrtime.bigint();
    let outcome;
    // NOTE: hrtime.bigint() is in nano seconds, which is 1e-6 apart from milli
    // seconds
    while (Number(hrtime.bigint() - start) / (1000 * 1000) < timeout) {
      outcome = await fn();
      if (outcome === expected) {
        break;
      }

      await new Promise(resolve => setTimeout(resolve, options.interval));
    }
    return result(outcome);
  });
}

module.exports = periodicExecution;
