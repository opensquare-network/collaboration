/**
 * @jest-environment node
 */

jest.mock("../../../env");
jest.mock("../../ipfs.service/pin");

const { reloadSpaces } = require("../../../spaces");
const { ObjectId, Decimal128 } = require("mongodb");
const { getProposalById } = require("..");
const { getDb } = require("../../../mongo");
const { karuraConfig } = require("../../../scripts/spaces/karura");

describe("Query Proposal Test", () => {
  let db;
  let proposalCol;
  let voteCol;
  let spaceCol;

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

    await voteCol.insertMany([
      {
        proposal: ObjectId("616e454d8f661dee51552e6a"),
        voter: "13d8i62igrsVw2bbRBzMtg7fH298n8exz7Y8y1Ty4K5bFuzf",
        address: "13d8i62igrsVw2bbRBzMtg7fH298n8exz7Y8y1Ty4K5bFuzf",
        voterNetwork: "karura",
        choices: ["Aye"],
        cid: "QmXoJvVbwdtBU5JC1ZgzZUtE2eBE92BVjmUsjzK98RJVec",
        data: {},
        pinHash: "QmXoJvVbwdtBU5JC1ZgzZUtE2eBE92BVjmUsjzK98RJVec",
        remark: "",
        signature:
          "0x4899168d4b6597d4d3fbff99a5a8fabd3d56509973a38e805bf9900f9498c50078bfbf382bb5a182d6e0edb7bddac7bc18c5a2ef54b3896a39200ffcdd99d181",
        weights: {
          balanceOf: new Decimal128("11111110000000"),
          quadraticBalanceOf: new Decimal128("3333333166666.6625"),
        },
      },
      {
        proposal: ObjectId("616e454d8f661dee51552e6a"),
        voter: "14uSQFo8WePzpZaBUZHKa8AqDxigH1wjtNDHaRAG8ipSqQS3",
        address: "14uSQFo8WePzpZaBUZHKa8AqDxigH1wjtNDHaRAG8ipSqQS3",
        voterNetwork: "karura",
        choices: ["Nay"],
        cid: "QmXoJvVbwdtBU5JC1ZgzZUtE2eBE92BVjmUsjzK98RJVec",
        data: {},
        pinHash: "QmXoJvVbwdtBU5JC1ZgzZUtE2eBE92BVjmUsjzK98RJVec",
        remark: "",
        signature:
          "0x4899168d4b6597d4d3fbff99a5a8fabd3d56509973a38e805bf9900f9498c50078bfbf382bb5a182d6e0edb7bddac7bc18c5a2ef54b3896a39200ffcdd99d181",
        weights: {
          balanceOf: new Decimal128("11111110000000"),
          quadraticBalanceOf: new Decimal128("3333333166666.6625"),
        },
      },
    ]);
  });

  afterAll(async () => {
    await voteCol.drop();
    await proposalCol.drop();
    await spaceCol.drop();
    await db.close();
  });

  test("getProposalById(mongoId)", async () => {
    const proposal = await getProposalById("616e454d8f661dee51552e6a");

    expect(proposal).toMatchObject({
      _id: new ObjectId("616e454d8f661dee51552e6a"),
      space: "karura",
      networksConfig: [karuraConfig],
      postUid: "36",
      title: "Proposal#1",
      content: "Proposal#1",
      contentType: "markdown",
      choiceType: "single",
      choices: ["Aye", "Nay"],
      snapshotHeights: { karura: 779147 },
      weightStrategy: ["balance-of", "quadratic-balance-of"],
      cid: "QmRgpY9WUuxKkptU6Sj9ow97u5QtFeRYnx4pqXzVBfMapE",
      pinHash: "QmRgpY9WUuxKkptU6Sj9ow97u5QtFeRYnx4pqXzVBfMapE",
      votedWeights: {
        balanceOf: "22222220000000",
        quadraticBalanceOf: "6666666333334",
      },
      votesCount: 2,
      status: "active",
    });
  });

  test("getProposalById(proposalCid)", async () => {
    const proposal = await getProposalById(
      "QmRgpY9WUuxKkptU6Sj9ow97u5QtFeRYnx4pqXzVBfMapE"
    );

    expect(proposal).toMatchObject({
      _id: new ObjectId("616e454d8f661dee51552e6a"),
      space: "karura",
      networksConfig: [karuraConfig],
      postUid: "36",
      title: "Proposal#1",
      content: "Proposal#1",
      contentType: "markdown",
      choiceType: "single",
      choices: ["Aye", "Nay"],
      snapshotHeights: { karura: 779147 },
      weightStrategy: ["balance-of", "quadratic-balance-of"],
      cid: "QmRgpY9WUuxKkptU6Sj9ow97u5QtFeRYnx4pqXzVBfMapE",
      pinHash: "QmRgpY9WUuxKkptU6Sj9ow97u5QtFeRYnx4pqXzVBfMapE",
      votedWeights: {
        balanceOf: "22222220000000",
        quadraticBalanceOf: "6666666333334",
      },
      votesCount: 2,
      status: "active",
    });
  });
});
