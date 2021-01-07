// @format
const test = require("ava");
const { hrtime } = require("process");

const periodicExecution = require("../src/index.js");

test("if periodic execution can run for 2 secs until a value becomes expected", async t => {
  const length = 200;
  const timeout = 300;
  t.assert(length < timeout);
  const start = hrtime.bigint();
  const elapsedMs = () => Number(hrtime.bigint() - start) / (1000 * 1000);
  const fn = () => elapsedMs() >= length;
  t.false(fn());

  const result = await periodicExecution(fn, true, timeout, { interval: 50 });
  t.true(result);

  const elapsedTime = elapsedMs();
  t.assert(elapsedTime < timeout && elapsedTime > length);
});

test("if periodic execution can timeout", async t => {
  const length = 200;
  const timeout = 100;
  t.assert(length > timeout);
  const start = hrtime.bigint();
  const elapsedMs = () => Number(hrtime.bigint() - start) / (1000 * 1000);
  const fn = () => elapsedMs() >= length;
  t.false(fn());

  const result = await periodicExecution(fn, true, timeout, { interval: 50 });
  t.false(result);
  const elapsedTime = elapsedMs();
  t.assert(elapsedTime > timeout && elapsedTime < length);
});
