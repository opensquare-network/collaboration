const { getSystemBalance } = require("./polkadotApi");
jest.setTimeout(3000000);

const { ApiPromise, WsProvider } = require("@polkadot/api");

const TreasuryAccount = "F3opxRbN5ZbjJNU511Kj2TLuzFcDq9BGduA9TgiECafpg29";

describe("test get balance", () => {
  let api;
  let provider;

  beforeAll(async () => {
    provider = new WsProvider("wss://kusama.api.onfinality.io/public-ws", 1000);
    api = await ApiPromise.create({ provider });
  });

  afterAll(async () => {
    await provider.disconnect();
  });

  test("of kusama at 6000000 works", async () => {
    const blockHash = await api.rpc.chain.getBlockHash(6000000);

    const balance = await getSystemBalance(api, blockHash, TreasuryAccount)
    expect(balance).toEqual({
      "free": "0x000000000000000003e54801e029c51b",
      "reserved": 0,
      "miscFrozen": 0,
      "feeFrozen": 0
    })
  });

  test("of kusama at 1468800 works", async () => {
    const blockHash = await api.rpc.chain.getBlockHash(1468800);
    const balance = await getSystemBalance(api, blockHash, TreasuryAccount)
    expect(balance).toEqual({
      "free": "0x0000000000000000024c9fc2d63fd40f",
      "reserved": 0,
      "miscFrozen": 0,
      "feeFrozen": 0
    })
  });

  test("of kusama at 1382400 works", async () => {
    const blockHash = await api.rpc.chain.getBlockHash(1382400);

    const balance = await getSystemBalance(api, blockHash, TreasuryAccount)
    expect(balance).toEqual({
      "free": "0x0000000000000000024c8ba7f046e8ef",
      "reserved": 0,
      "miscFrozen": 0,
      "feeFrozen": 0
    })
  });

  test("of kusama at 500000 works", async () => {
    const blockHash = await api.rpc.chain.getBlockHash(500000);
    const balance = await getSystemBalance(api, blockHash, TreasuryAccount)
    expect(balance).toEqual({
      "free": "0x000000000000000000bd706dd299a424",
      "reserved": 0
    })
  });
});
