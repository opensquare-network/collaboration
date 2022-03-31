import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import Input from "components/input";
import { useViewfunc } from "frontedUtils/hooks";
import {
  canUseProxySelector,
  loginAddressSelector,
  loginNetworkSelector,
  proxyBalanceSelector,
  proxySelector,
  setUseProxy,
  useProxySelector,
} from "store/reducers/accountSlice";
import { addToast } from "store/reducers/toastSlice";
import { TOAST_TYPES } from "frontedUtils/constants";
import {
  bigNumber2Locale,
  fromAssetUnit,
  isEmpty,
  toApproximatelyFixed,
} from "frontedUtils";
import nextApi from "services/nextApi";
import PostAddress from "../postAddress";
import ButtonPrimary from "@/components/button";
import Option from "@/components/option";
import { text_secondary_red_500 } from "../../styles/colorStyles";
import BigNumber from "bignumber.js";
import Toggle from "../toggle";
import { findNetworkConfig } from "services/util";
import isNil from "lodash.isnil";
import { proposalStatus } from "../../frontedUtils/consts/proposal";

const Wrapper = styled.div`
  > :not(:first-child) {
    margin-top: 20px;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  > :not(:first-child) {
    margin-top: 16px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

const ButtonsWrapper = styled.div`
  > :not(:first-child) {
    margin-top: 8px;
  }
`;

const ProxyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`;

const ToggleWrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  > :not(:first-child) {
    margin-left: 12px;
  }
`;

const RedText = styled.span`
  margin-left: 8px;
  ${text_secondary_red_500};
`;

export default function PostVote({ proposal, threshold = 0 }) {
  const dispatch = useDispatch();
  const [choiceIndex, setChoiceIndex] = useState(null);
  const [remark, setRemark] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState();
  const viewfunc = useViewfunc();
  const router = useRouter();
  const useProxy = useSelector(useProxySelector);
  const proxyAddress = useSelector(proxySelector);
  const proxyBalance = useSelector(proxyBalanceSelector);

  const loginAddress = useSelector(loginAddressSelector);
  const { network: loginNetwork } = useSelector(loginNetworkSelector) || {};

  const voteBalance = useProxy ? proxyBalance : balance;
  const belowThreshold = new BigNumber(voteBalance).isLessThan(threshold);
  const canVote =
    !belowThreshold &&
    !isNil(choiceIndex) &&
    proposalStatus.active === proposal?.status;

  const supportProxy = useSelector(canUseProxySelector);
  const snapshot = proposal.snapshotHeights[loginNetwork];

  const reset = () => {
    setChoiceIndex(null);
    setRemark("");
  };

  const proposalClosed = proposalStatus.closed === proposal?.status;

  useEffect(() => {
    if (proposal && loginAddress && loginNetwork) {
      nextApi
        .fetch(
          `${proposal.space}/proposal/${proposal.cid}/voterbalance/${loginNetwork}/${loginAddress}`,
          { snapshot }
        )
        .then((response) => {
          setBalance(response?.result?.balance);
        })
        .catch((e) => {
          const message = e?.message || "Failed to get balance.";
          dispatch(addToast({ type: TOAST_TYPES.ERROR, message }));
        });
    } else {
      setBalance(null);
    }
  }, [proposal, loginNetwork, loginAddress, dispatch]);

  const onVote = async () => {
    if (isLoading) return;

    if (!viewfunc) {
      return;
    }

    if (!loginAddress) {
      dispatch(
        addToast({
          type: TOAST_TYPES.ERROR,
          message: "Please connect wallet",
        })
      );
      return;
    }
    if (choiceIndex === null) {
      dispatch(
        addToast({
          type: TOAST_TYPES.ERROR,
          message: "Choice is missing",
        })
      );
      return;
    }
    setIsLoading(true);
    let result;
    try {
      result = await viewfunc.addVote(
        proposal?.space,
        proposal?.cid,
        proposal?.choices?.[choiceIndex],
        remark,
        loginAddress,
        useProxy ? proxyAddress : undefined,
        loginNetwork
      );
    } catch (error) {
      if (error.toString() === "Error: Cancelled") {
        return;
      }
      dispatch(
        addToast({ type: TOAST_TYPES.ERROR, message: error.toString() })
      );
      return;
    } finally {
      setIsLoading(false);
    }
    if (result?.error) {
      dispatch(
        addToast({ type: TOAST_TYPES.ERROR, message: result.error.message })
      );
    } else if (result) {
      router.replace({
        query: {
          ...router.query,
          page: "last",
        },
      });
      dispatch(
        addToast({
          type: TOAST_TYPES.SUCCESS,
          message: "Vote submitted!",
        })
      );
      reset();
    }
  };

  const networkConfig = findNetworkConfig(
    proposal.networksConfig,
    loginNetwork
  );

  return (
    <Wrapper>
      <InnerWrapper>
        <Title>{proposalClosed ? "Options" : "Cast your vote"}</Title>
        <ButtonsWrapper>
          {(proposal.choices || []).map((item, index) => (
            <Option
              key={index}
              active={index === choiceIndex}
              onClick={() => {
                if (index === choiceIndex) {
                  setChoiceIndex(null);
                } else {
                  setChoiceIndex(index);
                }
              }}
              disabled={proposalClosed}
            >
              <div className="index">{`#${index + 1}`}</div>
              <div className="option">{item}</div>
            </Option>
          ))}
        </ButtonsWrapper>
      </InnerWrapper>
      {!isNil(choiceIndex) && (
        <InnerWrapper>
          <Title>Remark</Title>
          <Input
            placeholder="What do you think about this proposal? (optional)"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </InnerWrapper>
      )}
      {!proposalClosed && (
        <InnerWrapper>
          <ProxyHeader>
            <div>
              {!isNil(voteBalance) &&
                `Available ${toApproximatelyFixed(
                  bigNumber2Locale(
                    fromAssetUnit(voteBalance, networkConfig?.decimals)
                  )
                )} ${networkConfig?.symbol}`}
              {belowThreshold && <RedText>Insufficient</RedText>}
            </div>
            {supportProxy && (
              <ToggleWrapper>
                <div>Proxy vote</div>
                <Toggle
                  active={useProxy}
                  onClick={() => dispatch(setUseProxy(!useProxy))}
                />
              </ToggleWrapper>
            )}
          </ProxyHeader>
          {useProxy && (
            <PostAddress spaceId={proposal.space} snapshot={snapshot} />
          )}
          <ButtonPrimary
            primary
            large
            isLoading={isLoading}
            onClick={onVote}
            disabled={!canVote}
          >
            {useProxy ? "Proxy Vote" : "Vote"}
          </ButtonPrimary>
        </InnerWrapper>
      )}
    </Wrapper>
  );
}
