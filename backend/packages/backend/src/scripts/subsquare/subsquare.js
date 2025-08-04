const { isNil } = require("lodash");

/**
 *
 * @param {string} network - ('polkadot' or 'kusama')
 * @param {number} referendumIndex - referendum
 * @returns {Promise<Object>} referendum detail
 */
async function getReferendumDetailFromSubsquare(network, referendumIndex) {
  if (isNil(referendumIndex)) {
    throw new Error(`Invalid referendum index: ${referendumIndex}`);
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
}

module.exports = {
  getReferendumDetailFromSubsquare,
};
