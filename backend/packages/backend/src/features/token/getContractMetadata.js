const {
  getContractMetadata: _getContractMetadata,
} = require("../../services/node.service/getContractMetadata");

async function getContractMetadata(ctx) {
  const { chain, contractAddress } = ctx.params;

  ctx.body = await _getContractMetadata(chain, contractAddress);
}

module.exports = {
  getContractMetadata,
};
