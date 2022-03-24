const { erc20Abi } = require("./abi");
const { evmChains, evmProviderMap } = require("./providers");
const { ethers } = require("ethers");

class Erc20Controller {
  async getBalance(ctx) {
    const { chain, contract, address, blockHeight } = ctx.params;
    if (!evmChains[chain]) {
      ctx.throw(400, `Invalid chain: ${chain}`);
      return;
    }

    const blockTag = parseInt(blockHeight);
    if (isNaN(blockTag)) {
      ctx.throw(400, `Invalid block height: ${chain}`);
      return;
    }

    const erc20 = new ethers.Contract(
      contract,
      erc20Abi,
      evmProviderMap[chain]
    );
    const balance = await erc20.balanceOf(address, { blockTag });

    ctx.body = {
      balance: balance.toString(),
    };
  }
}

module.exports = new Erc20Controller();
