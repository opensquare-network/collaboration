require("dotenv").config();
const { pick, isNil } = require("lodash");
const { signWithPolkadot } = require("../../utils/signature");
const minimist = require("minimist");
const { getReferendumDetailFromSubsquare } = require("./subsquare");
const { getSpaceDetail, createProposal } = require("./space");
const {
  OPENSQUARE_HOST,
  SPACE_ID,
  SINGLE_CHOICE_TYPE,
  getVotingProposalTitle,
} = require("./common");

const generateProposalParams = (data, network, space) => {
  const source = `https://${network}.subsquare.io/referenda/${data.referendumIndex}`;
  const startDate = new Date();
  startDate.setUTCHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setUTCDate(endDate.getUTCDate() + 60);

  return {
    space: space.id,
    networksConfig: {
      ...pick(space, [
        "type",
        "symbol",
        "decimals",
        "networks",
        "accessibility",
        "whitelist",
        "members",
        "quorum",
        "version",
      ]),
      strategies: space.weightStrategy,
    },
    title: getVotingProposalTitle(data, network),
    content: `\n[${source}](${source})\n${data.contentSummary.summary}`,
    contentType: "markdown",
    choiceType: SINGLE_CHOICE_TYPE,
    choices: ["Aye", "Nay", "Abstain"],
    realProposer: null,
    snapshotHeights: space.latestFinalizedHeights,
    version: "5",
    address: "1U4BVADQkTEZZgFqzHA8UrccFWmEWbFruCEK7U1cuZrPKcf",
    startDate: startDate.getTime(),
    endDate: endDate.getTime(),
    proposerNetwork: network,
  };
};

const main = async () => {
  const args = minimist(process.argv.splice(2));
  const { network, id: referendumIndexStr } = args;
  const referendumIndex = parseInt(referendumIndexStr, 10);
  if (!network || isNil(referendumIndex)) {
    console.log("network or referendum index is required");
    return;
  }

  const space = await getSpaceDetail(SPACE_ID);
  if (!space) {
    console.error(`Space ${SPACE_ID} not found`);
    return;
  }

  const referendumDetail = await getReferendumDetailFromSubsquare(
    network,
    referendumIndex,
  );
  if (!referendumDetail) {
    console.log(`Referendum ${referendumIndex} not find`);
    return;
  }

  const proposalParams = generateProposalParams(
    referendumDetail,
    network,
    space,
  );
  const signData = await signWithPolkadot(
    JSON.stringify(proposalParams),
    network,
  );
  if (!signData) {
    console.log("sign data is null");
    return;
  }

  const res = await createProposal({
    signature: signData.signature,
    data: proposalParams,
    address: signData.address,
  });
  if (res) {
    console.log(
      `Referendum ${referendumIndex} is imported. Title: ${proposalParams?.title}; link: ${OPENSQUARE_HOST}/space/${SPACE_ID}/proposal/${res.cid}`,
    );
  } else {
    console.log("Create error");
  }

  process.exit(1);
};

main();
