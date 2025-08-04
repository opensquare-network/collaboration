const { OPENSQUARE_HOST, SPACE_ID } = require("./common");
const fetch = require("node-fetch");
/**
 *
 * @param {string} spaceId
 * @returns space detail
 */
const getSpaceDetail = async (spaceId) => {
  try {
    const response = await fetch(`${OPENSQUARE_HOST}/api/spaces/${spaceId}`, {
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

const createProposal = async (body) => {
  try {
    const response = await fetch(
      `${OPENSQUARE_HOST}/api/${SPACE_ID}/proposals`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000,
        body: JSON.stringify(body),
      },
    );
    if (!response.ok) {
      throw Error(`HTTP ERROR: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};

module.exports = {
  getSpaceDetail,
  createProposal,
};
