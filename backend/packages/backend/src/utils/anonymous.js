const omit = require("lodash.omit");

function getAnonymousVote(vote) {
  return omit(vote, ["voter", "address", "signature", "data", "pinHash"]);
}

module.exports = {
  getAnonymousVote,
};
