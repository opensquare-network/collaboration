const { evmChains } = require("../../constants");
const { queryBalance } = require("./query/stellaswap");

class StellaSwapController {
  async getBalance(ctx) {
    const { chain, address, blockHeight } = ctx.params;
    if (chain !== evmChains.moonbeam) {
      ctx.throw(400, `Invalid chain: ${chain}`);
      return;
    }

    const contractAddress = "0xF3a5454496E26ac57da879bf3285Fa85DEBF0388";

    const blockTag = parseInt(blockHeight);
    if (isNaN(blockTag)) {
      ctx.throw(400, `Invalid block height: ${chain}`);
      return;
    }

    const balance = await queryBalance(
      chain,
      contractAddress,
      address,
      blockTag,
    );

    ctx.body = {
      balance: balance.toString(),
    };
  }
}

module.exports = new StellaSwapController();
