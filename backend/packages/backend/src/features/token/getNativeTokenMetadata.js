const {
  getNativeTokenMetadata: _getNativeTokenMetadata,
} = require("../../services/node.service/getNativeTokenMetadata");

async function getNativeTokenMetadata(ctx) {
  const { chain } = ctx.params;

  ctx.body = await _getNativeTokenMetadata(chain);
}

module.exports = {
  getNativeTokenMetadata,
};
