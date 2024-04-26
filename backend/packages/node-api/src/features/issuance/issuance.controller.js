const { queryStatemineAssetIssuance } = require("./issuance.statemine");
const { queryOrmlTokenIssuance } = require("./issuance.orml");
const { queryNativeTokenIssuance } = require("./native.issuance");
const { chains } = require("../../constants");
const { tokens } = require("./tokens");

class IssuanceController {
  async getTotalIssuance(ctx) {
    const { token = "", blockHashOrHeight } = ctx.params;

    const tokenConfig = tokens[token.toLowerCase()];
    if (!tokenConfig) {
      ctx.throw(400, `Invalid token: ${token}`);
      return;
    }

    if (tokenConfig.isChain && tokenConfig.isNative) {
      const totalIssuance = await queryNativeTokenIssuance(
        tokenConfig.chain,
        blockHashOrHeight,
      );
      ctx.body = { totalIssuance };
      return;
    }

    if (tokenConfig.isOrml) {
      const totalIssuance = await queryOrmlTokenIssuance(
        tokenConfig,
        blockHashOrHeight,
      );
      ctx.body = { totalIssuance };
      return;
    }

    if (
      !tokenConfig.isChain &&
      [chains.statemine, chains.statemint].includes(tokenConfig.chain) &&
      tokenConfig.isAssetsModule
    ) {
      const totalIssuance = await queryStatemineAssetIssuance(
        tokenConfig,
        blockHashOrHeight,
      );
      ctx.body = { totalIssuance };
      return;
    }

    ctx.throw(400, `Invalid token: ${token}`);
  }
}

module.exports = new IssuanceController();
