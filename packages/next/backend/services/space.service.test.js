/**
 * @jest-environment node
 */

jest.mock("./node.service");
jest.mock("../env");

const { getDb } = require("../mongo");
const { startUpdateHeight, stopUpdateHeight } = require("./chain.service");
const { getSpace, getSpaces } = require("./space.service");

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe("Spaces Test", () => {
  let db;
  beforeAll(async () => {
    db = await getDb();

    startUpdateHeight();
    await sleep(1000);
  });

  afterAll(async () => {
    stopUpdateHeight();
    await db.close();
  });

  test("getSpaces", async () => {
    const spaces = await getSpaces();
    expect(spaces).toEqual({
      polkadot: {
        symbol: 'DOT',
        network: 'polkadot',
        ss58Format: 0,
        decimals: 10,
        relay: undefined,
        proposeThreshold: '1000000000000',
        weightStrategy: [ 'balance-of' ],
        activeProposalsCount: 0
      },
      kusama: {
        symbol: 'KSM',
        network: 'kusama',
        ss58Format: 2,
        decimals: 12,
        relay: undefined,
        proposeThreshold: '1000000000000',
        weightStrategy: [ 'balance-of' ],
        activeProposalsCount: 0
      },
      karura: {
        symbol: 'KAR',
        network: 'karura',
        ss58Format: 8,
        decimals: 12,
        relay: { symbol: 'KSM', network: 'kusama', ss58Format: 2, decimals: 12 },
        proposeThreshold: '1000000000000',
        weightStrategy: [ 'balance-of' ],
        activeProposalsCount: 0
      },
      khala: {
        symbol: 'PHA',
        network: 'khala',
        ss58Format: 30,
        decimals: 12,
        relay: { symbol: 'KSM', network: 'kusama', ss58Format: 2, decimals: 12 },
        proposeThreshold: '1000000000000',
        weightStrategy: [ 'balance-of' ],
        activeProposalsCount: 0
      }
    });
  });

  test("getSpace", async () => {
    const space = await getSpace("polkadot");
    expect(space).toEqual({
      symbol: 'DOT',
      network: 'polkadot',
      ss58Format: 0,
      decimals: 10,
      latestFinalizedHeight: 100000,
      relay: undefined,
      proposeThreshold: '1000000000000',
      weightStrategy: [ 'balance-of' ],
    });
  });
});
