require("dotenv").config();
const { describe, it } = require("mocha");
const assert = require("assert");
const generateToken = require("../src/functions/generateToken");
const generatePayload = require("../src/functions/generatePayload");
const secret = process.env.SECRET;

describe("#Generator token", () => {
  it("Without param payload", async () => {
    const token = await generateToken(null, secret);
    const expected = `Error: Expected "payload" to be a plain object.`;
    assert.equal(token, expected);
  });
  it("Without param secret", async () => {
    const payload = generatePayload(1);
    const token = await generateToken(payload, null);
    const expected = "Error: secretOrPrivateKey must have a value";
    assert.equal(token, expected);
  });
});
