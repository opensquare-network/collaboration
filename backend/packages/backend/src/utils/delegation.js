const uniq = require("lodash.uniq");

function findDelegationStrategies(networksConfig, network) {
  if (!networksConfig) return [];

  return uniq(
    networksConfig.networks
      .filter((n) => n.network === network && n.delegation)
      .map((n) => n.delegation),
  );
}

module.exports = {
  findDelegationStrategies,
};
