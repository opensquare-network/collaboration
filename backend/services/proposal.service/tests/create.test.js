/**
 * @jest-environment node
 */

jest.setTimeout(3000000);
jest.mock("../../ipfs.service/pin");
jest.mock("../../../utils/polkadotApi");
jest.mock("../../../env");

const { createProposal } = require("..");
const { getDb } = require("../../../mongo");
const { WeightStrategy } = require("../../../constants");


describe("Create Proposal Test", () => {
  let db;
  let proposalCol;

  beforeAll(async () => {
    db = await getDb();
    proposalCol = await db.getCollection("proposal");
  });

  afterAll(async () => {
    await proposalCol.drop();
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
        weightStrategy: [WeightStrategy.BalanceOf],
        data: {},
        address: '5EgqZkmeq5c2VVb5TYwMkXHWRQ9V5q6pucoeoiUcWE455Vcp',
        signature: '',
        cid: 'QmZAxGcgQvryyUM7wUr1t5MGaAGNG5T3SbmAvtabG8KMn8',
      }
    ]);
  });
});
