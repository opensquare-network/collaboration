import styled from "styled-components";

import Row from "@/components/row";
import Toggle from "@osn/common-ui/es/Toggle";
import PostAddress from "../postAddress";
import BigNumber from "bignumber.js";
import { toPrecision } from "../../frontedUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  canUseProxySelector,
  loginAddressSelector,
  setUseProxy,
  targetBalanceSelector,
  useProxySelector,
} from "../../store/reducers/accountSlice";
import {
  balanceLoadingSelector,
  loadBalanceErrorSelector,
  proxyBalanceLoadingSelector,
} from "../../store/reducers/statusSlice";
import BalanceRow from "@/components/postCreate/BalanceRow";
import { hasBalanceStrategy } from "frontedUtils/strategy";
import SocietyMemberHit from "./societyMemberHit";

const Hint = styled.div`
  margin-top: 4px !important;
  color: var(--textFeedbackError);
`;

const ProxyVoteWrapper = styled.div`
  margin-top: 4px !important;
`;

const PostAddressWrapper = styled.div`
  margin-top: 4px !important;
`;

export default function Information({ space }) {
  const {
    proposeThreshold: threshold,
    decimals,
    symbol,
    weightStrategy,
  } = space;

  const dispatch = useDispatch();
  const balance = useSelector(targetBalanceSelector);
  const canUseProxy = useSelector(canUseProxySelector);
  const loadBalanceError = useSelector(loadBalanceErrorSelector);
  const useProxy = useSelector(useProxySelector);
  const belowThreshold = new BigNumber(balance).isLessThan(threshold);
  const loginAddress = useSelector(loginAddressSelector);

  const proxyBalanceLoading = useSelector(proxyBalanceLoadingSelector);
  const balanceLoading = useSelector(balanceLoadingSelector);

  let proxyElements = null;
  if (canUseProxy) {
    proxyElements = (
      <>
        <ProxyVoteWrapper>
          <Row
            header="Proxy vote"
            content={
              <Toggle
                on={useProxy}
                setOn={() => dispatch(setUseProxy(!useProxy))}
              />
            }
          />
        </ProxyVoteWrapper>
        {useProxy && (
          <PostAddressWrapper>
            <PostAddress size="small" spaceId={space.id} />
          </PostAddressWrapper>
        )}
      </>
    );
  }

  let hint = null;
  if (!loginAddress) {
    hint = <Hint>Link an address to create proposal.</Hint>;
  } else if (loadBalanceError) {
    hint = <Hint>{loadBalanceError}</Hint>;
  } else if (belowThreshold) {
    hint = (
      <Hint>
        You need to have a minimum of {toPrecision(threshold, decimals)}{" "}
        {symbol} in order to publish a proposal.
      </Hint>
    );
  }

  return (
    <>
      {hasBalanceStrategy(weightStrategy) && (
        <BalanceRow
          balance={balance}
          isLoading={useProxy ? proxyBalanceLoading : balanceLoading}
          decimals={decimals}
          symbol={symbol}
        />
      )}
      {hint}
      {space.accessibility === "society" && <SocietyMemberHit space={space} />}
      {proxyElements}
    </>
  );
}
