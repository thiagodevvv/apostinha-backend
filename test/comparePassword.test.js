const { describe, it } = require("mocha");
const assert = require("assert");
const comparePassword = require("../src/functions/comparePassword");
describe("#Compare Password SignIn", () => {
  it("Success Password OK", async () => {
    const expected = true;
    const hashPassword =
      "$2b$05$xPzJkGoZhaTiUkqHqEyBi.yh2SKgM6VAX51LhKg66J5r0ZVl/hus2";
    const actual = await comparePassword("12345", hashPassword);
    assert.equal(actual, expected);
  });
  it("Incorrect Password", async () => {
    const expected = false;
    const hashPassword =
      "$2b$05$xPzJkGoZhaTiUkqHqEyBi.dssyh2SKgM6VdssdAX51LhKg66J5r0ZVl/hus2";
    const actual = await comparePassword("12345", hashPassword);
    assert.equal(actual, expected);
  });
});
