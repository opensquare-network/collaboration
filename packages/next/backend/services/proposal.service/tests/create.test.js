/**
 * @jest-environment node
 */

jest.mock("../../ipfs.service/pin");
jest.mock("../../node.service");

const { createProposal } = require("..");
const { getDb } = require("../../../mongo");
const { WeightStrategy } = require("../../../constants");
const { reloadSpaces } = require("../../../spaces");


describe("Create Proposal Test", () => {
  let db;
  let proposalCol;
  let spaceCol;

  beforeAll(async () => {
    db = await getDb();
    proposalCol = await db.getCollection("proposal");
    spaceCol = db.getCollection("space");

    await spaceCol.insertMany([
      {
        name: "karura",
        display: "Karura",
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

  });

  afterAll(async () => {
    await proposalCol.drop();
    await spaceCol.drop();

    await db.close();
  });

  test("createProposal", async () => {
    const space = "karura",
          title = "Title",
          content = "Content",
          contentType = "markdown",
          choices = ["Nay", "Aye"],
          choiceType = "single",
          startDate = Date.now() - 1000*3600,
          endDate = Date.now() + 1000*3600,
          snapshotHeight = 800000,
          realProposer = null;
          data = {},
          address = "5EgqZkmeq5c2VVb5TYwMkXHWRQ9V5q6pucoeoiUcWE455Vcp",
          signature = "";

    await createProposal(
      space,
      title,
      content,
      contentType,
      choiceType,
      choices,
      startDate,
      endDate,
      snapshotHeight,
      realProposer,
      data,
      address,
      signature,
    );

    const items = await proposalCol.find({}).toArray();
    expect(items).toMatchObject([
      {
        space,
        postUid: '1',
        title,
        content,
        contentType,
        choiceType,
        choices,
        startDate,
        endDate,
        snapshotHeight,
        weightStrategy: [
          "balance-of",
          "quadratic-balance-of",
        ],
        data: {},
        address: '5EgqZkmeq5c2VVb5TYwMkXHWRQ9V5q6pucoeoiUcWE455Vcp',
        cid: 'QmZAxGcgQvryyUM7wUr1t5MGaAGNG5T3SbmAvtabG8KMn8',
        signature: "",
      }
    ]);
  });
});
