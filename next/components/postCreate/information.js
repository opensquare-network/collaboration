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
import SocietyMemberHint from "./societyMemberHint";
import WhitelistMemberHint from "./whitelistMemberHint";

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

function Proxy({ space }) {
  const dispatch = useDispatch();
  const useProxy = useSelector(useProxySelector);
  const canUseProxy = useSelector(canUseProxySelector);
  if (!canUseProxy) {
    return null;
  }

  return (
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

function InfoHint({ space }) {
  const { proposeThreshold: threshold, decimals, symbol } = space;

  const balance = useSelector(targetBalanceSelector);
  const loadBalanceError = useSelector(loadBalanceErrorSelector);
  const belowThreshold = new BigNumber(balance).isLessThan(threshold);
  const loginAddress = useSelector(loginAddressSelector);

  if (!loginAddress) {
    return <Hint>Link an address to create proposal.</Hint>;
  } else if (loadBalanceError) {
    return <Hint>{loadBalanceError}</Hint>;
  } else if (belowThreshold) {
    return (
      <Hint>
        You need to have a minimum of {toPrecision(threshold, decimals)}{" "}
        {symbol} in order to publish a proposal.
      </Hint>
    );
  }
}

export default function Information({ space }) {
  const { decimals, symbol, weightStrategy } = space;

  const balance = useSelector(targetBalanceSelector);
  const useProxy = useSelector(useProxySelector);

  const proxyBalanceLoading = useSelector(proxyBalanceLoadingSelector);
  const balanceLoading = useSelector(balanceLoadingSelector);

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
      <InfoHint space={space} />
      {space.accessibility === "society" && <SocietyMemberHint space={space} />}
      {space.accessibility === "whitelist" && (
        <WhitelistMemberHint whitelist={space?.whitelist}>
          Only members can create a proposal
        </WhitelistMemberHint>
      )}
      <Proxy space={space} />
    </>
  );
}
