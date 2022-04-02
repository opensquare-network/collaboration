/**
 * @jest-environment node
 */

jest.mock("../../ipfs.service/pin");
jest.mock("../../node.service");

const { createProposal } = require("..");
const { getDb } = require("../../../mongo");
const { reloadSpaces } = require("../../../spaces");
const { karuraConfig } = require("../../../scripts/spaces/karura");

describe("Create Proposal Test", () => {
  let db;
  let proposalCol;
  let spaceCol;

  beforeAll(async () => {
    db = await getDb();
    proposalCol = await db.getCollection("proposal");
    spaceCol = db.getCollection("space");

    await spaceCol.insertMany([karuraConfig]);

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
      startDate = Date.now() - 1000 * 3600,
      endDate = Date.now() + 1000 * 3600,
      snapshotHeights = { karura: 800000 },
      realProposer = null,
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
      snapshotHeights,
      realProposer,
      data,
      address,
      signature
    );

    const items = await proposalCol.find({}).toArray();
    expect(items).toMatchObject([
      {
        space,
        postUid: "1",
        networksConfig: {
          symbol: karuraConfig.symbol,
          decimals: karuraConfig.decimals,
          networks: karuraConfig.networks,
        },
        title,
        content,
        contentType,
        choiceType,
        choices,
        startDate,
        endDate,
        snapshotHeights,
        weightStrategy: ["balance-of", "quadratic-balance-of"],
        data: "5EgqZkmeq5c2VVb5TYwMkXHWRQ9V5q6pucoeoiUcWE455Vcp",
        address: "",
        cid: "QmV21bp9kmxTkTFxV3uViwx5CJcoYpWZrGT9rAkfmE2b8e",
        signature: null,
      },
    ]);
  });
});
