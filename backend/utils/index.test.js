/**
 * @jest-environment node
 */

const { toSymbolUnit, fromSymbolUnit, sqrtOfBalance } = require(".");

jest.setTimeout(3000000);

describe("Util test", () => {
  beforeAll(async () => {
  });

  afterAll(async () => {
  });

  test("toSymbolUnit", async () => {
    const value = toSymbolUnit("1000000000000", 12);

    expect(value).toEqual("1");
  });

  test("fromSymbolUnit", async () => {
    const value = fromSymbolUnit("1", 12);

    expect(value).toEqual("1000000000000");
  });

  test("sqrtOfBalance", async () => {
    const value = sqrtOfBalance("100000000000000", 12);

    expect(value).toEqual("10000000000000");

  });
});
