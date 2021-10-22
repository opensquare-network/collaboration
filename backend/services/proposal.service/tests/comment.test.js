/**
 * @jest-environment node
 */

const { ObjectId } = require("mongodb");
const { getComments, postComment } = require("..");
const { getDb } = require("../../../mongo");

jest.mock("../../ipfs.service/pin");

describe("Comment Test", () => {
  let db;
  let proposalCol;
  let commentCol;

  beforeAll(async () => {
    db = await getDb();
    proposalCol = db.getCollection("proposal");
    commentCol = db.getCollection("comment");

    await proposalCol.insertMany([
      {
        "_id": ObjectId("616e454d8f661dee51552e6a"),
        "space": "karura",
        "postUid": "36",
        "title": "Proposal#1",
        "content": "Proposal#1",
        "contentType": "markdown",
        "choiceType": "single",
        "choices": [
            "Aye",
            "Nay"
        ],
        "startDate": Date.now() - 3600*1000,
        "endDate": Date.now() + 3600*1000,
        "snapshotHeight": 779147,
        "weightStrategy": [
            "balance-of",
            "quadratic-balance-of"
        ],
        "cid": "QmRgpY9WUuxKkptU6Sj9ow97u5QtFeRYnx4pqXzVBfMapE",
        "pinHash": "QmRgpY9WUuxKkptU6Sj9ow97u5QtFeRYnx4pqXzVBfMapE"
      }
    ]);
  });

  afterAll(async () => {
    await commentCol.drop();
    await proposalCol.drop();
    await db.close();
  });

  test("postComment", async () => {
    let proposalCid = "QmRgpY9WUuxKkptU6Sj9ow97u5QtFeRYnx4pqXzVBfMapE",
        content = "Nay",
        contentType = "Remark",
        data = {},
        address = "14uSQFo8WePzpZaBUZHKa8AqDxigH1wjtNDHaRAG8ipSqQS3",
        signature = "0x4899168d4b6597d4d3fbff99a5a8fabd3d56509973a38e805bf9900f9498c50078bfbf382bb5a182d6e0edb7bddac7bc18c5a2ef54b3896a39200ffcdd99d181";

    await postComment(
      proposalCid,
      content,
      contentType,
      data,
      address,
      signature,
    );

    const result = await getComments("616e454d8f661dee51552e6a", 1, 10);
    expect(result).toMatchObject({
      items: [
        {
          _id: new ObjectId("616e6cce1493c854d201ef48"),
          proposal: new ObjectId("616e454d8f661dee51552e6a"),
          content: 'Nay',
          contentType: 'Remark',
          data: {},
          address: '14uSQFo8WePzpZaBUZHKa8AqDxigH1wjtNDHaRAG8ipSqQS3',
          signature: '0x4899168d4b6597d4d3fbff99a5a8fabd3d56509973a38e805bf9900f9498c50078bfbf382bb5a182d6e0edb7bddac7bc18c5a2ef54b3896a39200ffcdd99d181',
          height: 1,
          cid: 'QmZPLzpusNUu6Re4CRhqcw74tEi9Rb9ecYePk2h2Sr2CjG',
          pinHash: 'QmZPLzpusNUu6Re4CRhqcw74tEi9Rb9ecYePk2h2Sr2CjG'
        }
      ],
      total: 1,
      page: 1,
      pageSize: 10
    });

  });
});
