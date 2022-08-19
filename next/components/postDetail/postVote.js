import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { Input, Button, Flex } from "@osn/common-ui";
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
import {
  newErrorToast,
  newPendingToast,
  newToastId,
  removeToast,
} from "store/reducers/toastSlice";
import {
  bigNumber2Locale,
  fromAssetUnit,
  toApproximatelyFixed,
} from "frontedUtils";
import nextApi from "services/nextApi";
import PostAddress from "../postAddress";
import Option from "@/components/option";
import { text_secondary_red_500 } from "../../styles/colorStyles";
import BigNumber from "bignumber.js";
import Toggle from "@osn/common-ui/es/Toggle";
import { findNetworkConfig } from "services/util";
import isNil from "lodash.isnil";
import { proposalStatus } from "../../frontedUtils/consts/proposal";
import { extensionCancelled } from "../../frontedUtils/consts/extension";
import { useTerminate } from "./terminate";
import Tooltip from "../tooltip";
import VoteBalanceDetail from "./VoteBalanceDetail";

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
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  span.type {
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    text-align: right;
    color: #a1a8b3;
    text-transform: capitalize;
  }
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
  const [choiceIndexes, setChoiceIndexes] = useState([]);
  const [remark, setRemark] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState();
  const [balanceDetail, setBalanceDetail] = useState([]);
  const viewfunc = useViewfunc();
  const router = useRouter();
  const useProxy = useSelector(useProxySelector);
  const proxyAddress = useSelector(proxySelector);
  const proxyBalance = useSelector(proxyBalanceSelector);

  const loginAddress = useSelector(loginAddressSelector);
  const { network: loginNetwork } = useSelector(loginNetworkSelector) || {};

  const { terminateButton } = useTerminate({
    proposal,
    loginAddress,
    loginNetwork,
  });

  const voteBalance = useProxy ? proxyBalance : balance;
  const belowThreshold = new BigNumber(voteBalance).isLessThan(threshold);
  const canVote =
    !belowThreshold &&
    choiceIndexes.length &&
    proposalStatus.active === proposal?.status;

  const supportProxy = useSelector(canUseProxySelector);
  const snapshot = proposal.snapshotHeights[loginNetwork];

  const reset = () => {
    setChoiceIndexes([]);
    setRemark("");
  };

  const proposalClosed = [
    proposalStatus.closed,
    proposalStatus.terminated,
  ].includes(proposal?.status);

  useEffect(() => {
    if (proposal && loginAddress && loginNetwork) {
      nextApi
        .fetch(
          `${proposal.space}/proposal/${proposal.cid}/voterbalance/${loginNetwork}/${loginAddress}`,
          { snapshot }
        )
        .then((response) => {
          setBalance(response?.result?.balanceOf);
          setBalanceDetail(response?.result?.details);
        })
        .catch((e) => {
          const message = e?.message || "Failed to get balance.";
          dispatch(newErrorToast(message));
        });
    } else {
      setBalance(null);
    }
  }, [proposal, loginNetwork, loginAddress, dispatch, snapshot]);

  const onVote = async () => {
    if (isLoading) return;

    if (!viewfunc) {
      return;
    }

    if (!loginAddress) {
      dispatch(newErrorToast("Please connect wallet"));
      return;
    }
    if (!choiceIndexes.length) {
      dispatch(newErrorToast("Choice is missing"));
      return;
    }

    let signedData;
    setIsLoading(true);
    try {
      const choices = choiceIndexes.map(
        (choiceIndex) => proposal?.choices?.[choiceIndex]
      );

      signedData = await viewfunc.signVote(
        proposal?.space,
        proposal?.cid,
        choices,
        remark,
        loginAddress,
        useProxy ? proxyAddress : undefined,
        loginNetwork
      );
    } catch (error) {
      const errorMessage = error.message;
      if (extensionCancelled === errorMessage) {
        setIsLoading(false);
      } else {
        dispatch(newErrorToast(errorMessage));
      }
      return;
    }

    const toastId = newToastId();
    dispatch(
      newPendingToast(toastId, "Saving and uploading the vote to IPFS...")
    );
    let result;
    try {
      result = await nextApi.post(`${proposal?.space}/votes`, signedData);
    } finally {
      dispatch(removeToast(toastId));
      setIsLoading(false);
    }

    if (result?.error) {
      dispatch(newErrorToast(result.error.message));
    } else if (result) {
      router.replace({
        query: {
          ...router.query,
          page: "last",
        },
      });
      reset();
    }
  };

  const networkConfig = findNetworkConfig(
    proposal.networksConfig,
    loginNetwork
  );

  const onClickChoice = (index) => {
    if (choiceIndexes.includes(index)) {
      setChoiceIndexes(
        choiceIndexes.filter((choiceIndex) => choiceIndex !== index)
      );
    } else {
      if (proposal.choiceType === "single") {
        setChoiceIndexes([index]);
      } else {
        setChoiceIndexes([...choiceIndexes, index]);
      }
    }
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <Title>
          {proposalClosed ? "Options" : "Cast your vote"}
          <span className="type">{proposal.choiceType}</span>
        </Title>
        <ButtonsWrapper>
          {(proposal.choices || []).map((item, index) => (
            <Option
              key={index}
              active={choiceIndexes.includes(index)}
              onClick={() => onClickChoice(index)}
              disabled={proposalClosed}
              index={index + 1}
              block
            >
              {item}
            </Option>
          ))}
        </ButtonsWrapper>
      </InnerWrapper>
      {choiceIndexes.length > 0 && (
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
              {!isNil(voteBalance) && (
                <div>
                  <Tooltip
                    content={<VoteBalanceDetail details={balanceDetail} />}
                  >
                    {`Available ${toApproximatelyFixed(
                      bigNumber2Locale(
                        fromAssetUnit(
                          voteBalance,
                          proposal?.networksConfig?.decimals
                        )
                      )
                    )} ${proposal.networksConfig?.symbol}`}
                  </Tooltip>
                </div>
              )}
              {belowThreshold && <RedText>Insufficient</RedText>}
            </div>
            {supportProxy && (
              <ToggleWrapper>
                <div>Proxy vote</div>
                <Toggle
                  on={useProxy}
                  setOn={() => dispatch(setUseProxy(!useProxy))}
                />
              </ToggleWrapper>
            )}
          </ProxyHeader>
          {useProxy && (
            <PostAddress spaceId={proposal.space} snapshot={snapshot} />
          )}

          <Flex>
            <Button
              primary
              large
              block
              isLoading={isLoading}
              onClick={onVote}
              disabled={!canVote}
            >
              {useProxy ? "Proxy Vote" : "Vote"}
            </Button>

            {terminateButton}
          </Flex>
        </InnerWrapper>
      )}
    </Wrapper>
  );
}
