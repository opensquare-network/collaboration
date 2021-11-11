/**
 * @jest-environment node
 */

const { getApi } = require("./node.service");

jest.mock("../env");
describe("Node API Test", () => {

  beforeAll(async () => {
  });

  afterAll(async () => {
  });

  test("GetBalance", async () => {
    const api = getApi("kusama");
    const result = await api.get("/balance/EXofyZF1En5q6Jp2BjKiZ7WSkwFcwQQK3cgTPZAPFVtREFe/10032128");
    expect(result.data).toEqual({ free: 990148000483, reserved: 0, miscFrozen: 0, feeFrozen: 0 });
  });

  test("Proxy", async () => {
    const api = getApi("kusama");
    const result = await api.get("/proxy/F6CqcNuda8dZ7UaPAmKC3z7Bi8kNUf8Q1QvXq1zKvHfB3LY/EqxPh1aYPAjcQiRuKXvzMrsfAnxcwyhtktxkUVBbVjYRyNH/10023024");
    expect(result.data).toEqual({
      isProxy: true,
    });
  });
});
