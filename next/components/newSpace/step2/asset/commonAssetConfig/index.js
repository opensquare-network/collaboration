import { useState } from "react";
import { Wrapper } from "../styled";
import AssetDetail from "../assetDetail";
import AssetConfig from "../assetConfig";

export default function CommonAssetConfig({ chain, nativeTokenInfo }) {
  const [threshold, setThreshold] = useState(0);
  const [votingWeight, setVotingWeight] = useState(1);

  if (!nativeTokenInfo) {
    return null;
  }

  return (
    <Wrapper>
      <AssetDetail
        symbol={nativeTokenInfo?.symbol}
        decimals={nativeTokenInfo?.decimals}
      />
      <AssetConfig
        symbol={nativeTokenInfo?.symbol}
        threshold={threshold}
        setThreshold={setThreshold}
        votingWeight={votingWeight}
        setVotingWeight={setVotingWeight}
      />
    </Wrapper>
  );
}
