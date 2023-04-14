import { useState } from "react";
import { FieldWrapper, Title, Wrapper } from "../styled";
import AssetDetail from "../assetDetail";
import AssetConfig from "../assetConfig";
import AssetSelector from "../assetSelector";
import { Chains } from "@osn/constants";
import { bifrostOrmlTokens, karuraOrmlTokens } from "../constants";

export default function OrmlTokenConfig({ chain, nativeTokenInfo }) {
  const [assetType, setAssetType] = useState("");
  const [threshold, setThreshold] = useState(0);
  const [votingWeight, setVotingWeight] = useState(1);

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

  return (
    <Wrapper>
      <FieldWrapper>
        <Title>Asset</Title>
        <AssetSelector chain={chain} onSelect={setAssetType} />
      </FieldWrapper>

      <AssetDetail symbol={symbol} decimals={decimals} />
      <AssetConfig
        symbol={symbol}
        threshold={threshold}
        setThreshold={setThreshold}
        votingWeight={votingWeight}
        setVotingWeight={setVotingWeight}
      />
    </Wrapper>
  );
}
