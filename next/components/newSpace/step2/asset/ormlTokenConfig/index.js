import { useEffect, useState } from "react";
import { FieldWrapper, Title, Wrapper } from "../styled";
import AssetDetail from "../assetDetail";
import AssetConfig from "../assetConfig";
import AssetSelector from "../assetSelector";
import { noop } from "@osn/common-ui";
import nextApi from "services/nextApi";

const ormlTokensCache = {};

export default function OrmlTokenConfig({
  count,
  chain,
  nativeTokenInfo,
  asset,
  setPartialAsset = noop,
}) {
  const [assetType, setAssetType] = useState("");
  const [ormlTokens, setOrmlTokens] = useState([]);

  useEffect(() => {
    if (ormlTokensCache[chain]) {
      setOrmlTokens(ormlTokensCache[chain]);
      return;
    }

    setOrmlTokens([]);
    nextApi.fetch(`chain/${chain}/tokens/orml`).then(({ result }) => {
      if (result) {
        ormlTokensCache[chain] = result;
        setOrmlTokens(result);
      }
    });
  }, [chain]);

  useEffect(() => {
    if (asset?.type !== "token" && assetType !== "native") {
      setPartialAsset({ type: "token" });
    } else if (asset?.type !== undefined && assetType === "native") {
      setPartialAsset({ type: undefined });
    }
  }, [assetType, asset?.type, setPartialAsset]);

  const assetTypes = [
    { value: "native", symbol: nativeTokenInfo?.symbol, type: "Native" },
    ...ormlTokens.map((item) => ({
      value: item.symbol,
      symbol: item.symbol,
      type: "ORML Asset",
    })),
  ];

  const token =
    assetType === "native"
      ? nativeTokenInfo
      : ormlTokens.find((item) => item.symbol === assetType);

  const symbol = token?.symbol;
  const decimals = token?.decimals;

  return (
    <Wrapper>
      <FieldWrapper>
        <Title>Asset</Title>
        <AssetSelector
          assetTypes={assetTypes}
          chain={chain}
          onSelect={setAssetType}
        />
      </FieldWrapper>

      <AssetDetail
        symbol={symbol}
        decimals={decimals}
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
