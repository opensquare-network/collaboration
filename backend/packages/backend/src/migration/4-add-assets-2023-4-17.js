const dotenv = require("dotenv");
dotenv.config();

const { getSpaceCollection } = require("../mongo");

async function main() {
  const spaceCol = await getSpaceCollection();
  const items = await spaceCol.find({}).toArray();

  for (const item of items) {
    const networks = item.networks.map((network) => {
      if (network.assets?.length > 0) {
        return network;
      }

      const type = network.type;
      const assetId = network.assetId;
      const contract = network.contract;
      const symbol = network.symbol || item.symbol;
      const decimals = network.decimals || item.decimals;
      const multiplier = network.multiplier;
      const delegation = network.delegation;
      const ss58Format = network.ss58Format;

      const asset = { symbol };
      if (type !== undefined) asset.type = type;
      if (assetId !== undefined) asset.assetId = assetId;
      if (contract !== undefined) asset.contract = contract;
      if (symbol !== undefined) asset.symbol = symbol;
      if (decimals !== undefined) asset.decimals = decimals;
      if (multiplier !== undefined) asset.multiplier = multiplier;
      if (delegation !== undefined) asset.delegation = delegation;

      const res = {
        network: network.network,
        assets: [asset],
      };

      if (ss58Format !== undefined) res.ss58Format = ss58Format;

      return res;
    });

    await spaceCol.updateOne(
      { _id: item._id },
      { $set: { ...item, networks } },
    );
  }
}

main()
  .catch(console.error)
  .finally(() => process.exit());
