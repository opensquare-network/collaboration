const { evmChains } = require("../../constants");
const { queryBalance } = require("./query/stellaswap");

class StellaSwapController {
  async getBalance(ctx) {
    const { chain, contract, address, blockHeight } = ctx.params;
    if (chain !== evmChains.moonbeam) {
      ctx.throw(400, `Invalid chain: ${chain}`);
      return;
    }

    const blockTag = parseInt(blockHeight);
    if (isNaN(blockTag)) {
      ctx.throw(400, `Invalid block height: ${chain}`);
      return;
    }

    const balance = await queryBalance(chain, contract, address, blockTag);

    ctx.body = {
      balance: balance.toString(),
    };
  }
}

module.exports = new StellaSwapController();
