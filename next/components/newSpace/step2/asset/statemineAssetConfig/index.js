import AssetTypeSelector from "./assetTypeSelector";
import { useEffect, useMemo, useState } from "react";
import { FieldWrapper, Title, Wrapper } from "../styled";
import { Input, noop } from "@osn/common-ui";
import AssetDetail from "../assetDetail";
import AssetConfig from "../assetConfig";
import { useIsMounted } from "@osn/common";
import nextApi from "services/nextApi";
import debounce from "lodash.debounce";

export default function StatemineAssetConfig({
  count,
  chain,
  nativeTokenInfo,
  asset,
  setPartialAsset = noop,
}) {
  const [assetType, setAssetType] = useState("native");
  const [assetId, setAssetId] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState(0);
  const isMounted = useIsMounted();

  const fetchAssetMetadata = useMemo(() => {
    return debounce(async (assetId) => {
      const { result, error } = await nextApi.fetch(
        `chain/${chain}/token/${assetId}`,
      );

      if (error) {
        return;
      }

      if (isMounted.current) {
        setSymbol(result?.symbol);
        setDecimals(result?.decimals);
      }
    }, 300);
  }, [chain, isMounted]);

  useEffect(() => {
    if (assetType === "native") {
      setSymbol(nativeTokenInfo?.symbol);
      setDecimals(nativeTokenInfo?.decimals);
    } else if (!assetId) {
      setSymbol("");
      setDecimals(0);
    } else {
      setSymbol("");
      setDecimals(0);
      fetchAssetMetadata(assetId);
    }
  }, [fetchAssetMetadata, assetType, assetId, nativeTokenInfo]);

  return (
    <Wrapper>
      <FieldWrapper>
        <Title>Asset Type</Title>
        <AssetTypeSelector onSelect={setAssetType} />
      </FieldWrapper>

      {assetType === "assets" && (
        <FieldWrapper>
          <Title>Asset ID</Title>
          <Input
            placeholder="Enter an asset ID"
            value={assetId}
            onChange={(e) => setAssetId(e.target.value)}
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
        count={count}
        symbol={nativeTokenInfo?.symbol}
        threshold={asset?.threshold}
        setThreshold={(threshold) => {
          if (asset?.threshold === threshold) return;
          setPartialAsset({ threshold });
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