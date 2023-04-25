const {
  getTokenMetadata: _getTokenMetadata,
} = require("../../services/node.service/getTokenMetadata");

async function getTokenMetadata(ctx) {
  const { chain, assetId } = ctx.params;

  ctx.body = await _getTokenMetadata(chain, assetId);
}

module.exports = {
  getTokenMetadata,
};
