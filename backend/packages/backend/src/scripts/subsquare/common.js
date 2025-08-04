const OPENSQUARE_HOST = "https://voting.opensquare.io";
const SPACE_ID = "tesub";
const SINGLE_CHOICE_TYPE = "single";
const CURRENCY_MAP = {
  polkadot: "DOT",
  kusama: "KSM",
};

function getVotingProposalTitle(subsquareReferendumDetail, network) {
  const detail = subsquareReferendumDetail;
  let track = "";
  const trackName = detail.onchainData.trackInfo.name || "";
  if (trackName) {
    track = `[${trackName
      .split("_")
      .map((word) => word[0].toUpperCase())
      .join("")}]`;
  }
  return `${track} ${CURRENCY_MAP[network]} #${detail.referendumIndex} - ${detail.title}`;
}

module.exports = {
  OPENSQUARE_HOST,
  SPACE_ID,
  SINGLE_CHOICE_TYPE,
  CURRENCY_MAP,
  getVotingProposalTitle,
};
