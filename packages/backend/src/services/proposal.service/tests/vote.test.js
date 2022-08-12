/**
 * @jest-environment node
 */

jest.mock("../../../env");
jest.mock("../../ipfs.service/pin");
jest.mock("../../node.service");

const { ObjectId } = require("mongodb");
const { vote, getVotes } = require("..");
const { getDb } = require("../../../mongo");
const { reloadSpaces } = require("../../../spaces");
const { karuraConfig } = require("../../../scripts/spaces/karura");

describe("Vote Test", () => {
  let db;
  let proposalCol;
  let voteCol;

  beforeAll(async () => {
    db = await getDb();
    proposalCol = db.getCollection("proposal");
    voteCol = db.getCollection("vote");
    spaceCol = db.getCollection("space");

    await spaceCol.insertMany([karuraConfig]);

    await reloadSpaces();

    await proposalCol.insertMany([
      {
        _id: ObjectId("616e454d8f661dee51552e6a"),
        space: "karura",
        networksConfig: [karuraConfig],
        postUid: "36",
        title: "Proposal#1",
        content: "Proposal#1",
        contentType: "markdown",
        choiceType: "single",
        choices: ["Aye", "Nay"],
        startDate: Date.now() - 3600 * 1000,
        endDate: Date.now() + 3600 * 1000,
        snapshotHeights: { karura: 779147 },
        weightStrategy: ["balance-of", "quadratic-balance-of"],
        cid: "QmRgpY9WUuxKkptU6Sj9ow97u5QtFeRYnx4pqXzVBfMapE",
        pinHash: "QmRgpY9WUuxKkptU6Sj9ow97u5QtFeRYnx4pqXzVBfMapE",
      },
    ]);
  });

  afterAll(async () => {
    await voteCol.drop();
    await proposalCol.drop();
    await spaceCol.drop();

    await db.close();
  });

  test("vote", async () => {
    let proposalCid = "QmRgpY9WUuxKkptU6Sj9ow97u5QtFeRYnx4pqXzVBfMapE",
      choices = ["Nay"],
      remark = "Remark",
      realVoter = null,
      voterNetwork = "karura",
      data = {},
      address = "14uSQFo8WePzpZaBUZHKa8AqDxigH1wjtNDHaRAG8ipSqQS3",
      signature =
        "0x4899168d4b6597d4d3fbff99a5a8fabd3d56509973a38e805bf9900f9498c50078bfbf382bb5a182d6e0edb7bddac7bc18c5a2ef54b3896a39200ffcdd99d181";

    await vote(
      proposalCid,
      choices,
      remark,
      realVoter,
      data,
      address,
      voterNetwork,
      signature
    );

    const result = await getVotes(
      "QmRgpY9WUuxKkptU6Sj9ow97u5QtFeRYnx4pqXzVBfMapE",
      1,
      10
    );
    expect(result).toMatchObject({
      items: [
        {
          _id: new ObjectId("616e6aeb30a3c9772e936c7c"),
          proposal: new ObjectId("616e454d8f661dee51552e6a"),
          voter: "14uSQFo8WePzpZaBUZHKa8AqDxigH1wjtNDHaRAG8ipSqQS3",
          address: "14uSQFo8WePzpZaBUZHKa8AqDxigH1wjtNDHaRAG8ipSqQS3",
          choices: ["Nay"],
          cid: "QmZPLzpusNUu6Re4CRhqcw74tEi9Rb9ecYePk2h2Sr2CjG",
          data: {},
          pinHash: "QmZPLzpusNUu6Re4CRhqcw74tEi9Rb9ecYePk2h2Sr2CjG",
          remark: "Remark",
          signature:
            "0x4899168d4b6597d4d3fbff99a5a8fabd3d56509973a38e805bf9900f9498c50078bfbf382bb5a182d6e0edb7bddac7bc18c5a2ef54b3896a39200ffcdd99d181",
          weights: {
            balanceOf: "10000000000000",
            quadraticBalanceOf: "3162277660168",
          },
        },
      ],
      total: 1,
      page: 1,
      pageSize: 10,
    });
  });
});
