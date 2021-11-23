const BigNumber = require('bignumber.js');

async function getTotalBalance(space, blockHeight, address) {
  const { free, reserved } = await space.getBalance(blockHeight, address);
  return new BigNumber(free || 0).plus(reserved || 0).toString();
}

module.exports = {
  getTotalBalance,
};
