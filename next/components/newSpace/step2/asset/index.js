import ChainSelector from "@/components/chainSelector";
import { noop } from "@osn/common-ui";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { availableNetworksSelector } from "store/reducers/accountSlice";
import StatemineAssetConfig from "./statemineAssetConfig";
import { FieldWrapper, Title, Wrapper } from "./styled";
import { useIsMounted } from "@osn/common";
import nextApi from "services/nextApi";
import CommonAssetConfig from "./commonAssetConfig";
import { Chains } from "@osn/constants";
import OrmlTokenConfig from "./ormlTokenConfig";
import Erc20TokenConfig from "./erc20TokenConfig";
import styled from "styled-components";
import useStateChanged from "hooks/useStateChanged";

const knownNativeTokens = {
  ethereum: {
    symbol: "ETH",
    decimals: 18,
  },
  moonriver: {
    symbol: "MOVR",
    decimals: 12,
    ss58Format: 1285,
  },
  moonbeam: {
    symbol: "GLMR",
    decimals: 12,
    ss58Format: 1284,
  },
};

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
  count,
  index,
  asset,
  setAsset = noop,
  removeAsset = noop,
}) {
  const availableNetworks = useSelector(availableNetworksSelector);
  const [nativeTokenInfo, setNativeTokenInfo] = useState();
  const isMounted = useIsMounted();
  const assetsCountChanged = useStateChanged(count);

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
    if (!asset?.chain) {
      return;
    }

    const nativeTokenInfo = knownNativeTokens[asset?.chain];
    if (nativeTokenInfo) {
      setNativeTokenInfo(nativeTokenInfo);
      return;
    }

    nextApi
      .fetch(`chain/${asset?.chain}/token/native`)
      .then(({ result, error }) => {
        if (error) {
          setNativeTokenInfo();
          return;
        }

        if (isMounted.current) {
          setNativeTokenInfo(result);
        }
      });
  }, [asset?.chain, isMounted]);

  useEffect(() => {
    if (nativeTokenInfo?.ss58Format === asset?.ss58Format) {
      return;
    }
    setPartialAsset({ ss58Format: nativeTokenInfo?.ss58Format });
  }, [nativeTokenInfo?.ss58Format, asset?.ss58Format, setPartialAsset]);

  let assetConfig = (
    <CommonAssetConfig
      count={count}
      chain={asset.chain}
      nativeTokenInfo={nativeTokenInfo}
      asset={asset}
      setPartialAsset={setPartialAsset}
    />
  );

  if ([Chains.statemine, Chains.statemint].includes(asset.chain)) {
    assetConfig = (
      <StatemineAssetConfig
        count={count}
        chain={asset.chain}
        asset={asset}
        nativeTokenInfo={nativeTokenInfo}
        setPartialAsset={setPartialAsset}
      />
    );
  } else if ([Chains.karura, Chains.bifrost].includes(asset.chain)) {
    assetConfig = (
      <OrmlTokenConfig
        count={count}
        chain={asset.chain}
        asset={asset}
        nativeTokenInfo={nativeTokenInfo}
        setPartialAsset={setPartialAsset}
      />
    );
  } else if (
    [Chains.moonriver, Chains.moonbeam, Chains.ethereum].includes(asset.chain)
  ) {
    assetConfig = (
      <Erc20TokenConfig
        count={count}
        chain={asset.chain}
        nativeTokenInfo={nativeTokenInfo}
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
        <ChainSelector chains={availableNetworks} onSelect={onSelectChain} />
      </MyFieldWrapper>
      {assetConfig}
    </Wrapper>
  );
}
