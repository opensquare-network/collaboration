/**
 * @jest-environment node
 */

jest.mock("./node.service");
jest.mock("../env");

const { getDb } = require("../mongo");
const { startUpdateHeight, stopUpdateHeight } = require("./chain.service");
const { getSpace, getSpaces } = require("./space.service");
const { reloadSpaces } = require("../spaces");

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe("Spaces Test", () => {
  let db;
  let spaceCol;

  beforeAll(async () => {
    db = await getDb();
    spaceCol = db.getCollection("space");

    await spaceCol.insertMany([
      {
        id: "karura",
        name: "Karura",
        network: "karura",
        symbol: "KAR",
        ss58Format: 8,
        decimals: 12,
        proposeThreshold: "1000000000000",
        voteThreshold: "10000000000",
        weightStrategy: ["balance-of","quadratic-balance-of"],
        identity: "kusama",
      },
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
        {
          id: "karura",
          name: "Karura",
          network: "karura",
          symbol: "KAR",
          ss58Format: 8,
          decimals: 12,
          proposeThreshold: "1000000000000",
          voteThreshold: "10000000000",
          weightStrategy: ["balance-of","quadratic-balance-of"],
          identity: {
            network: "kusama",
            ss58Format: 2
          },
        },

    });
  });

  test("getSpace", async () => {
    const space = await getSpace("karura");
    expect(space).toMatchObject({
      id: "karura",
      name: "Karura",
      network: "karura",
      symbol: "KAR",
      ss58Format: 8,
      decimals: 12,
      proposeThreshold: "1000000000000",
      voteThreshold: "10000000000",
      weightStrategy: ["balance-of","quadratic-balance-of"],
      identity: {
        network: "kusama",
        ss58Format: 2
      },
      latestFinalizedHeight: 100000,
    });
  });
});
