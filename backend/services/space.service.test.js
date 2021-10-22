/**
 * @jest-environment node
 */

jest.mock("./chain.service");
jest.mock("../env");

const { getDb } = require("../mongo");
const { getSpace, getSpaces } = require("./space.service");

describe("Spaces Test", () => {
  let db;
  beforeAll(async () => {
    db = await getDb();
  });

  afterAll(async () => {
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
