import ChainSelector from "@/components/chainSelector";
import { noop } from "@osn/common-ui";
import { useCallback, useEffect } from "react";
import StatemineAssetConfig from "./statemineAssetConfig";
import { FieldWrapper, Title, Wrapper } from "./styled";
import CommonAssetConfig from "./commonAssetConfig";
import OrmlTokenConfig from "./ormlTokenConfig";
import Erc20TokenConfig from "./erc20TokenConfig";
import styled from "styled-components";
import useStateChanged from "hooks/useStateChanged";
import { AssetTypes } from "./constants";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #ee4444;
`;

const MyFieldWrapper = styled(FieldWrapper)`
  z-index: 20;
`;

export default function Asset({
  chainsDef,
  tokensDef,
  count,
  index,
  asset,
  setAsset = noop,
  removeAsset = noop,
}) {
  const assetsCountChanged = useStateChanged(count);

  const chainInfo = chainsDef.find((item) => item.network === asset?.chain);

  const setPartialAsset = useCallback(
    (partialData) => {
      setAsset({
        ...asset,
        ...partialData,
      });
    },
    [asset, setAsset],
  );

  const onSelectChain = useCallback(
    (chain) => {
      if (!chain) {
        return;
      }

      if (chain?.network === asset?.chain) {
        // this is required to prevent infinite loop
        return;
      }

      setPartialAsset({
        chain: chain?.network,
        type: undefined,
        assetId: undefined,
        contract: undefined,
      });
    },
    [asset?.chain, setPartialAsset],
  );

  useEffect(() => {
    if (assetsCountChanged && count === 1 && asset.votingWeight !== "1") {
      setPartialAsset({ votingWeight: "1" });
    }
  }, [assetsCountChanged, count, asset, setPartialAsset]);

  useEffect(() => {
    if (chainInfo?.ss58Format === asset?.ss58Format) {
      return;
    }
    setPartialAsset({ ss58Format: chainInfo?.ss58Format });
  }, [chainInfo?.ss58Format, asset?.ss58Format, setPartialAsset]);

  let assetConfig = (
    <CommonAssetConfig
      count={count}
      chain={asset.chain}
      nativeTokenInfo={chainInfo}
      asset={asset}
      setPartialAsset={setPartialAsset}
    />
  );

  if (chainInfo?.supportAssetTypes?.includes(AssetTypes.ASSETS)) {
    assetConfig = (
      <StatemineAssetConfig
        count={count}
        chain={asset.chain}
        asset={asset}
        nativeTokenInfo={chainInfo}
        setPartialAsset={setPartialAsset}
      />
    );
  } else if (chainInfo?.supportAssetTypes?.includes(AssetTypes.ORML)) {
    assetConfig = (
      <OrmlTokenConfig
        tokensDef={tokensDef}
        count={count}
        chain={asset.chain}
        asset={asset}
        nativeTokenInfo={chainInfo}
        setPartialAsset={setPartialAsset}
      />
    );
  } else if (chainInfo?.supportAssetTypes?.includes(AssetTypes.EVM_ERC20)) {
    assetConfig = (
      <Erc20TokenConfig
        count={count}
        chain={asset.chain}
        nativeTokenInfo={chainInfo}
        asset={asset}
        setPartialAsset={setPartialAsset}
      />
    );
  }

  return (
    <Wrapper>
      <Header>
        <Title>Asset #{index + 1}</Title>
        {count > 1 && (
          <DeleteWrapper onClick={removeAsset}>Delete</DeleteWrapper>
        )}
      </Header>
      <MyFieldWrapper>
        <Title>Chain</Title>
        <ChainSelector chains={chainsDef} onSelect={onSelectChain} />
      </MyFieldWrapper>
      {assetConfig}
    </Wrapper>
  );
}
