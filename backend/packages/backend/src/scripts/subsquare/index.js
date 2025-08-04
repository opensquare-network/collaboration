require("dotenv").config();
const { isNil } = require("lodash");
const { signWithPolkadot } = require("../../utils/signature");
const minimist = require("minimist");
const { getReferendumDetailFromSubsquare } = require("./subsquare");
const { getSpaceDetail, createProposal } = require("./space");
const { OPENSQUARE_HOST, SPACE_ID } = require("./common");
const { getProposalData } = require("./proposal");

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

  const proposalData = getProposalData(referendumDetail, network, space);
  const signData = await signWithPolkadot(
    JSON.stringify(proposalData),
    network,
  );
  if (!signData) {
    console.log("sign data is null");
    return;
  }

  const res = await createProposal({
    signature: signData.signature,
    data: proposalData,
    address: signData.address,
  });
  if (res) {
    console.log(
      `Referendum ${referendumIndex} is imported. Title: ${proposalData?.title}; link: ${OPENSQUARE_HOST}/space/${SPACE_ID}/proposal/${res.cid}`,
    );
  } else {
    console.log("Create error");
  }

  process.exit(1);
};

main();
