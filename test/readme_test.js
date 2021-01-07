// @format
const test = require("ava");
const path = require("path");
const { readFileSync } = require("fs");

test("if readme example works", async t => {
  const md = readFileSync(path.resolve(__dirname, "../README.md"));
  const text = md.toString();
  const expr = new RegExp("```(?:js|javascript)\\n([\\s\\S]*?)```", "gm");
  const example = `
    \`\`\`js
      const hello = "world";
    \`\`\`
  `;

  let [matchRes] = example.match(expr);
  t.assert(matchRes === '```js\n      const hello = "world";\n    ```');

  matchRes = matchRes.replace("```js\n", "");
  matchRes = matchRes.replace("\n```", "");
  t.assert(!matchRes.includes("```js\n"));
  t.assert(!matchRes.includes("\n```"));

  let [readmeMatch] = text.match(expr);
  readmeMatch = readmeMatch.replace("```js\n", "");
  readmeMatch = readmeMatch.replace("\n```", "");
  readmeMatch = readmeMatch.replace(
    "periodic-execution",
    path.resolve(__dirname, "../src/index.js")
  );

  const altReadme = readmeMatch + "\nthrow new Error('just for testing')";
  t.throws(() => eval(altReadme));

  await eval(readmeMatch);
  t.pass();
});
