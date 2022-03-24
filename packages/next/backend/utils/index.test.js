/**
 * @jest-environment node
 */

const { toSymbolUnit, fromSymbolUnit, toDecimal128 } = require(".");

describe("Util Test", () => {
  beforeAll(async () => {});

  afterAll(async () => {});

  test("toSymbolUnit", async () => {
    const value = toSymbolUnit("1", 12);
    expect(value).toEqual("1000000000000");
  });

  test("fromSymbolUnit", async () => {
    const value = fromSymbolUnit("1000000000000", 12);
    expect(value).toEqual("1");
  });

  test("toDecimal128", async () => {
    const value = toDecimal128(1000000000000);
    expect(value?.toJSON()).toEqual({ $numberDecimal: "1000000000000" });
  });
});
