const {
  getNativeTokenMetadata: _getNativeTokenMetadata,
} = require("../../services/node.service/getTokenMetadata");

async function getNativeTokenMetadata(ctx) {
  const { chain, assetId } = ctx.params;

  ctx.body = await _getNativeTokenMetadata(chain, assetId);
}

module.exports = {
  getNativeTokenMetadata,
};
