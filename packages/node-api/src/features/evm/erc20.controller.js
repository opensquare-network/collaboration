const { queryBalance } = require("./query/erc20");
const { evmChains } = require("../../constants");

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

    const balance = await queryBalance(chain, contract, address, blockTag);

    ctx.body = {
      balance: balance.toString(),
    };
  }
}

module.exports = new Erc20Controller();
