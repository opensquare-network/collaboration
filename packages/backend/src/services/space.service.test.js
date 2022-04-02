/**
 * @jest-environment node
 */

jest.mock("./node.service");
jest.mock("../env");

const { getDb } = require("../mongo");
const { startUpdateHeight, stopUpdateHeight } = require("./chain.service");
const { getSpace, getSpaces } = require("./space.service");
const { reloadSpaces } = require("../spaces");
const { karuraConfig } = require("../scripts/spaces/karura");

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe("Spaces Test", () => {
  let db;
  let spaceCol;

  beforeAll(async () => {
    db = await getDb();
    spaceCol = db.getCollection("space");

    await spaceCol.insertMany([
      karuraConfig,
    ]);

    await reloadSpaces();

    startUpdateHeight();
    await sleep(1000);
  });

  afterAll(async () => {
    stopUpdateHeight();
    await spaceCol.drop();
    await db.close();
  });

  test("getSpaces", async () => {
    const spaces = await getSpaces();
    expect(spaces).toMatchObject({
      karura:
      karuraConfig,

    });
  });

  test("getSpace", async () => {
    const space = await getSpace("karura");
    expect(space).toMatchObject({
      ...karuraConfig,
    });
  });
});
