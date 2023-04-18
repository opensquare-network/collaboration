const uniq = require("lodash.uniq");

function findDelegationStrategies(networksConfig, network) {
  if (!networksConfig) return [];

  const networkConfig = networksConfig.networks?.find(
    (n) => n.network === network,
  );

  if (!networkConfig) return [];

  return uniq(
    (networkConfig.assets || [])
      .filter((item) => item.isNative)
      .map((item) => item.delegation),
  );
}

module.exports = {
  findDelegationStrategies,
};
