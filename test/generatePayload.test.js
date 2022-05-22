const { describe, it } = require("mocha");
const assert = require("assert");
const generateToken = require("../src/functions/generatePayload");
const generatePayload = require("../src/functions/generatePayload");

describe("#Generate Payload", () => {
  it("Success generate payload", () => {
    const expected = {
      id: 1,
    };
    const actual = generatePayload(1);
    assert.deepEqual(actual, expected);
  });
  it("Without param id", () => {
    const expected = false;
    const actual = generatePayload();
    assert.equal(actual, expected);
  });
});
