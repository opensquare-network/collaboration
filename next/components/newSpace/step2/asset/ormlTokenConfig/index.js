import { useEffect, useState } from "react";
import { FieldWrapper, Title, Wrapper } from "../styled";
import AssetDetail from "../assetDetail";
import AssetConfig from "../assetConfig";
import AssetSelector from "../assetSelector";
import { Chains } from "@osn/constants";
import { bifrostOrmlTokens, karuraOrmlTokens } from "../constants";
import { noop } from "@osn/common-ui";

export default function OrmlTokenConfig({
  count,
  chain,
  nativeTokenInfo,
  asset,
  setPartialAsset = noop,
}) {
  const [assetType, setAssetType] = useState("");

  const ormlTokens =
    chain === Chains.karura
      ? karuraOrmlTokens
      : chain === Chains.bifrost
      ? bifrostOrmlTokens
      : [];
  const token =
    assetType === "native"
      ? nativeTokenInfo
      : ormlTokens.find((item) => item.symbol === assetType);

  const symbol = token?.symbol;
  const decimals = token?.decimals;

  useEffect(() => {
    if (asset?.type !== "token" && assetType !== "native") {
      setPartialAsset({ type: "token" });
    } else if (asset?.type !== undefined && assetType === "native") {
      setPartialAsset({ type: undefined });
    }
  }, [assetType, asset?.type, setPartialAsset]);

  return (
    <Wrapper>
      <FieldWrapper>
        <Title>Asset</Title>
        <AssetSelector chain={chain} onSelect={setAssetType} />
      </FieldWrapper>

      <AssetDetail
        symbol={symbol}
        decimals={decimals}
        asset={asset}
        setPartialAsset={setPartialAsset}
      />
      <AssetConfig
        count={count}
        symbol={nativeTokenInfo?.symbol}
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
