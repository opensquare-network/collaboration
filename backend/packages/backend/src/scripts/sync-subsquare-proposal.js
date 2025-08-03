const fetch = require("node-fetch");
const { pick, isNil } = require("lodash");
const { signWithPolkadot } = require("../utils/signature");

const host = "https://test.opensquare.io";
const spaceId = "quinn-collective";

const choiceType = "single"; // Single choice voting\
const currencyMap = {
  polkadot: "DOT",
  kusama: "KSM",
};

/**
 *
 * @param {string} spaceId
 * @returns space detail
 */
const getSpaceDetail = async (spaceId) => {
  try {
    const response = await fetch(`${host}/api/spaces/${spaceId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 30000,
    });

    if (!response.ok) {
      throw new Error(`HTTP ERROR: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};

/**
 *
 * @param {string} network - ('polkadot' or 'kusama')
 * @param {number} referendumIndex - referendum
 * @returns {Promise<Object>} referendum detail
 */
const getReferendumDetail = async (network, referendumIndex) => {
  if (!referendumIndex) {
    throw new Error("referendum error");
  }

  const url = `https://${network.toLowerCase()}-api.subsquare.io/gov2/referendums/${referendumIndex}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "OpenSquare-Collaboration/1.0",
      },
      timeout: 30000,
    });

    if (!response.ok) {
      throw Error(`HTTP ERROR: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};

const getTitle = (detail, network) => {
  let track = "";
  const trackName = detail.onchainData.trackInfo.name || "";
  if (trackName) {
    track = `[${trackName
      .split("_")
      .map((word) => word[0].toUpperCase())
      .join("")}]`;
  }
  return `${track} ${currencyMap[network]} #${detail.referendumIndex} - ${detail.title}`;
};

/**
 * Structured parameters
 */
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
    title: getTitle(data, network),
    content: `\n[${source}](${source})\n${data.contentSummary.summary}`,
    contentType: "markdown",
    choiceType,
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

const createProposal = async (body) => {
  try {
    const response = await fetch(`${host}/api/${spaceId}/proposals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 30000,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw Error(`HTTP ERROR: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};

const main = async () => {
  const [network, referendumIndexStr] = process.argv.splice(2);
  const referendumIndex = parseInt(referendumIndexStr, 10);
  if (!network || isNil(referendumIndex)) {
    console.log("network or referendum index is required");
    return;
  }

  const space = await getSpaceDetail(spaceId);
  if (!space) {
    console.error(`Space ${spaceId} not found`);
    return;
  }

  const referendumDetail = await getReferendumDetail(network, referendumIndex);
  if (!referendumDetail) {
    console.log(`Referendum ${referendumIndex} detail not find`);
    return;
  }

  const proposalParams = generateProposalParams(
    referendumDetail,
    network,
    space,
  );
  const signData = await signWithPolkadot(
    JSON.stringify(proposalParams),
    "polkadot",
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
      "Create success:",
      `${host}/space/${spaceId}/proposal/${res.cid}`,
    );
  } else {
    console.log("Create error");
  }

  process.exit(1);
};

main();
