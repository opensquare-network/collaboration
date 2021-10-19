/**
 * @jest-environment node
 */

const dotenv = require("dotenv");
dotenv.config();

const { createProposal } = require("..");
const { getDb } = require("../../../mongo");

jest.setTimeout(3000000);
jest.mock("../../ipfs.service/pin");
jest.mock("../../../utils/polkadotApi");

describe("Create Proposal Test", () => {
  let db;

  beforeAll(async () => {
    db = await getDb();
  });

  afterAll(async () => {
    await db.close();
  });

  test("createProposal", async () => {
    const space = "polkadot",
          title = "Title",
          content = "Content",
          contentType = "markdown",
          choices = ["Nay", "Aye"],
          choiceType = "single",
          startDate = Date.now() - 1000*3600,
          endDate = Date.now() + 1000*3600,
          snapshotHeight = 800000,
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
      data,
      address,
      signature,
    );

    const proposalCol = await db.getCollection("proposal");
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
        weightStrategy: process.env.SPACE_WEIGHT_STRATEGY_POLKADOT.split(","),
        data: {},
        address: '5EgqZkmeq5c2VVb5TYwMkXHWRQ9V5q6pucoeoiUcWE455Vcp',
        signature: '',
        cid: 'QmZAxGcgQvryyUM7wUr1t5MGaAGNG5T3SbmAvtabG8KMn8',
      }
    ]);
  });
});
