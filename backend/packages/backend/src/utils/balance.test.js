const { adaptBalance } = require("./balance");

describe("Balance", () => {
  test("adapter works", async () => {
    let adapted = adaptBalance(4284515749629630000000000, 18, 12);
    expect(adapted).toEqual(4284515749629630000);

    adapted = adaptBalance(4284515749629630000000000, 12, 18);
    expect(adapted).toEqual(4284515749629630000000000 * Math.pow(10, 6));
  });
});
