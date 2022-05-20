const { describe, it } = require("mocha");
const assert = require("assert");
const validatorParamsRequest = require("../src/functions/validatorParamsRequest.js");
const schema = require("../src/api/schema/signup.js");

describe("#Validator params request", () => {
  it("Success Params", () => {
    const request = {
      email: "th.ferrari@outlook.com.br",
      username: "thiagox",
      password: "12343423",
    };
    const expected = {
      valid: true,
      error: "",
    };
    const actual = validatorParamsRequest(request, schema);
    assert.deepEqual(actual, expected);
  });
  it("Not complete params", () => {
    const request = {
      email: "th.ferrari@outlook.com.br",
      username: "thiagox",
    };
    const expected = {
      valid: false,
      error: "password",
      message: `"password" is required`,
    };
    const actual = validatorParamsRequest(request, schema);
    assert.deepEqual(actual, expected);
  });
  it("Type of params incorrect", () => {
    const request = {
      email: "th.ferrari@outlook.com.br",
      username: 1232,
      password: "asdkjhas",
    };
    const expected = {
      valid: false,
      error: "username",
      message: `"username" must be a string`,
    };
    const actual = validatorParamsRequest(request, schema);
    assert.deepEqual(actual, expected);
  });
});
