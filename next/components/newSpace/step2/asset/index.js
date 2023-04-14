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

const knownNativeTokens = {
  ethereum: {
    symbol: "ETH",
    decimals: 18,
  },
  moonriver: {
    symbol: "MOVR",
    decimals: 12,
  },
  moonbeam: {
    symbol: "GLMR",
    decimals: 12,
  },
};

export default function Asset({ index, asset, setAsset = noop }) {
  const availableNetworks = useSelector(availableNetworksSelector);
  const [nativeTokenInfo, setNativeTokenInfo] = useState();
  const isMounted = useIsMounted();

  const onSelectChain = useCallback(
    (chain) => {
      if (chain.network === asset.chain) {
        // this is required to prevent infinite loop
        return;
      }
      setAsset(index, { ...asset, chain: chain.network });
    },
    [index, asset],
  );

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
          return;
        }

        if (isMounted.current) {
          setNativeTokenInfo(result);
        }
      });
  }, [asset?.chain, isMounted]);

  let assetConfig = (
    <CommonAssetConfig chain={asset.chain} nativeTokenInfo={nativeTokenInfo} />
  );

  if ([Chains.statemine, Chains.statemint].includes(asset.chain)) {
    assetConfig = (
      <StatemineAssetConfig
        chain={asset.chain}
        nativeTokenInfo={nativeTokenInfo}
      />
    );
  } else if ([Chains.karura, Chains.bifrost].includes(asset.chain)) {
    assetConfig = (
      <OrmlTokenConfig chain={asset.chain} nativeTokenInfo={nativeTokenInfo} />
    );
  } else if (
    [Chains.moonriver, Chains.moonbeam, Chains.ethereum].includes(asset.chain)
  ) {
    //TODO: handle Chains.ethereum native token ?
    assetConfig = (
      <Erc20TokenConfig chain={asset.chain} nativeTokenInfo={nativeTokenInfo} />
    );
  }

  return (
    <Wrapper>
      <Title>Asset #{index + 1}</Title>
      <FieldWrapper>
        <Title>Chain</Title>
        <ChainSelector chains={availableNetworks} onSelect={onSelectChain} />
      </FieldWrapper>
      {assetConfig}
    </Wrapper>
  );
}
