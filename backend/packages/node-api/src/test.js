const ethers = require("ethers");

const stellaswapAbi = [
  "function userInfo(uint256 _pid, address _user) view returns (uint256 amount, uint256 rewardDebt, uint256 rewardLockedUp, uint256 nextHarvestUntil)",
];

async function main() {
  const provider = new ethers.providers.StaticJsonRpcProvider(
    "https://rpc.api.moonbeam.network",
  );
  const stellaswap = new ethers.Contract(
    "0xF3a5454496E26ac57da879bf3285Fa85DEBF0388",
    stellaswapAbi,
    provider,
  );
  const userInfo = await stellaswap.userInfo(
    3,
    "0x32449F0F8f1774F8d1661b8992A50A27F91Fa15c",
  );
  console.log(userInfo);
}

main().finally(() => process.exit(0));
