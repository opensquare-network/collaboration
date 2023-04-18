import { useState } from "react";
import { Wrapper } from "../styled";
import AssetDetail from "../assetDetail";
import AssetConfig from "../assetConfig";
import { noop } from "@osn/common-ui";

export default function CommonAssetConfig({
  chain,
  nativeTokenInfo,
  asset,
  setPartialAsset = noop,
}) {
  const [threshold, setThreshold] = useState("0");
  const [votingWeight, setVotingWeight] = useState("1");

  if (!nativeTokenInfo) {
    return null;
  }

  return (
    <Wrapper>
      <AssetDetail
        symbol={nativeTokenInfo?.symbol}
        decimals={nativeTokenInfo?.decimals}
        asset={asset}
        setPartialAsset={setPartialAsset}
      />
      <AssetConfig
        symbol={nativeTokenInfo?.symbol}
        threshold={threshold}
        setThreshold={setThreshold}
        votingWeight={votingWeight}
        setVotingWeight={setVotingWeight}
        asset={asset}
        setPartialAsset={setPartialAsset}
      />
    </Wrapper>
  );
}
