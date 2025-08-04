const { pick } = require("lodash");
const { getVotingProposalTitle, SINGLE_CHOICE_TYPE } = require("./common");

function getProposalData(subsquareReferendumDetail, network, space) {
  const source = `https://${network}.subsquare.io/referenda/${subsquareReferendumDetail.referendumIndex}`;

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
    title: getVotingProposalTitle(subsquareReferendumDetail, network),
    content: `\n[${source}](${source})\n${subsquareReferendumDetail.contentSummary.summary}`,
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
}

module.exports = {
  getProposalData,
};
