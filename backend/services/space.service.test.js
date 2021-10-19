/**
 * @jest-environment node
 */

const dotenv = require("dotenv");
dotenv.config();

jest.setTimeout(3000000);
jest.mock("./chain.service");

const { getSpace, getSpaces } = require("./space.service");

describe("Spaces Test", () => {
  beforeAll(async () => {
  });

  afterAll(async () => {
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
        proposeThreshold: '10000000000',
        weightStrategy: [ 'balance-of', 'quadratic-balance-of' ],
        activeProposalsCount: 0
      },
      kusama: {
        symbol: 'KSM',
        network: 'kusama',
        ss58Format: 2,
        decimals: 12,
        relay: undefined,
        proposeThreshold: '10000000000',
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
        weightStrategy: [ 'balance-of', 'quadratic-balance-of' ],
        activeProposalsCount: 0
      },
      khala: {
        symbol: 'KHA',
        network: 'khala',
        ss58Format: 30,
        decimals: 12,
        relay: { symbol: 'KSM', network: 'kusama', ss58Format: 2, decimals: 12 },
        proposeThreshold: '10000000000000',
        weightStrategy: [ 'quadratic-balance-of' ],
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
      proposeThreshold: '10000000000',
      weightStrategy: [ 'balance-of', 'quadratic-balance-of' ],
    });
  });
});
