import { Wrapper } from "../styled";
import AssetDetail from "../assetDetail";
import AssetConfig from "../assetConfig";
import { noop } from "@osn/common-ui";

export default function CommonAssetConfig({
  count,
  nativeTokenInfo,
  asset,
  setPartialAsset = noop,
}) {
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
        count={count}
        symbol={asset?.symbol}
        votingThreshold={asset?.votingThreshold}
        setVotingThreshold={(votingThreshold) => {
          if (asset?.votingThreshold === votingThreshold) return;
          setPartialAsset({ votingThreshold });
        }}
        votingWeight={asset?.votingWeight}
        setVotingWeight={(votingWeight) => {
          if (asset?.votingWeight === votingWeight) return;
          setPartialAsset({ votingWeight });
        }}
        asset={asset}
      />
    </Wrapper>
  );
}
