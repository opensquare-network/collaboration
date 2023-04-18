import AssetTypeSelector from "./assetTypeSelector";
import { useCallback, useEffect, useState } from "react";
import { FieldWrapper, Title, Wrapper } from "../styled";
import { Input, noop } from "@osn/common-ui";
import AssetDetail from "../assetDetail";
import AssetConfig from "../assetConfig";
import { useIsMounted } from "@osn/common";
import nextApi from "services/nextApi";

export default function Erc20TokenConfig({
  chain,
  nativeTokenInfo,
  asset,
  setPartialAsset = noop,
}) {
  const [assetType, setAssetType] = useState("native");
  const [contractAddress, setContractAddress] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState(0);
  const [threshold, setThreshold] = useState("0");
  const [votingWeight, setVotingWeight] = useState("1");
  const isMounted = useIsMounted();

  const fetchErc20TokenMetadata = useCallback(
    async (contractAddress) => {
      const { result, error } = await nextApi.fetch(
        `evm/chain/${chain}/contract/${contractAddress}`,
      );
      if (error) {
        return;
      }
      if (isMounted.current) {
        setSymbol(result?.symbol);
        setDecimals(result?.decimals);
      }
    },
    [chain, isMounted],
  );

  useEffect(() => {
    if (assetType === "native") {
      setSymbol(nativeTokenInfo?.symbol);
      setDecimals(nativeTokenInfo?.decimals);
    } else if (!contractAddress) {
      setSymbol("");
      setDecimals(0);
    } else {
      setSymbol("");
      setDecimals(0);
      fetchErc20TokenMetadata(contractAddress);
    }
  }, [fetchErc20TokenMetadata, assetType, contractAddress, nativeTokenInfo]);

  return (
    <Wrapper>
      <FieldWrapper>
        <Title>Asset Type</Title>
        <AssetTypeSelector onSelect={setAssetType} />
      </FieldWrapper>

      {assetType === "contract" && (
        <FieldWrapper>
          <Title>Asset Contract</Title>
          <Input
            placeholder="Enter an contract address"
            onBlur={(e) => setContractAddress(e.target.value)}
          />
        </FieldWrapper>
      )}

      <AssetDetail
        symbol={symbol}
        decimals={decimals}
        asset={asset}
        setPartialAsset={setPartialAsset}
      />
      <AssetConfig
        symbol={symbol}
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
