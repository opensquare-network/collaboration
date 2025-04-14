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
  proxyDelegationSelector,
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
  isZero,
  toApproximatelyFixed,
} from "frontedUtils";
import nextApi from "services/nextApi";
import PostAddress from "../postAddress";
import Option from "@/components/option";
import { text_secondary_red_500 } from "../../styles/colorStyles";
import BigNumber from "bignumber.js";
import Toggle from "@osn/common-ui/es/Toggle";
import isNil from "lodash.isnil";
import { proposalStatus } from "../../frontedUtils/consts/proposal";
import { extensionCancelled } from "../../frontedUtils/consts/extension";
import { TerminateButton } from "./terminate";
import { Tooltip } from "@osn/common-ui";
import VoteBalanceDetail from "./VoteBalanceDetail";
import DelegationInfo from "./delegationInfo";
import { hasBalanceStrategy } from "frontedUtils/strategy";
import SocietyMemberHint from "../postCreate/societyMemberHint";
import SocietyMemberButton from "../societyMemberButton";
import WhitelistMemberHint from "../postCreate/whitelistMemberHint";
import WhitelistMemberButton from "../whitelistMemberButton";

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
    color: var(--textTertiary);
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

function ProxySwitch() {
  const dispatch = useDispatch();
  const useProxy = useSelector(useProxySelector);

  return (
    <ToggleWrapper>
      <div>Proxy vote</div>
      <Toggle on={useProxy} setOn={() => dispatch(setUseProxy(!useProxy))} />
    </ToggleWrapper>
  );
}

function VoteBalance({ voteBalance, balanceDetail, proposal }) {
  return (
    <div>
      <Tooltip
        content={
          !isZero(voteBalance) ? (
            <VoteBalanceDetail details={balanceDetail} />
          ) : null
        }
      >
        {`Available ${toApproximatelyFixed(
          bigNumber2Locale(
            fromAssetUnit(voteBalance, proposal?.networksConfig?.decimals),
          ),
        )} ${proposal.networksConfig?.symbol}`}
      </Tooltip>
    </div>
  );
}

function BalanceInfo({ proposal, balance, balanceDetail, delegation }) {
  const useProxy = useSelector(useProxySelector);
  const proxyBalance = useSelector(proxyBalanceSelector);
  const proxyDelegation = useSelector(proxyDelegationSelector);
  const isSocietyProposal =
    proposal.networksConfig?.accessibility === "society";
  const isWhitelistProposal =
    proposal.networksConfig?.accessibility === "whitelist";

  const { network: loginNetwork } = useSelector(loginNetworkSelector) || {};

  const voteBalance = useProxy ? proxyBalance : balance;
  const voteDelegation = useProxy ? proxyDelegation : delegation;

  const belowThreshold = new BigNumber(voteBalance).eq(0);

  const supportProxy = useSelector(canUseProxySelector);
  const snapshot = proposal.snapshotHeights[loginNetwork];

  let balanceInfo = null;

  if (hasBalanceStrategy(proposal?.weightStrategy)) {
    if (voteDelegation) {
      balanceInfo = (
        <DelegationInfo
          delegatee={voteDelegation?.delegatee}
          network={loginNetwork}
        />
      );
    } else {
      balanceInfo = (
        <>
          {!isNil(voteBalance) && (
            <VoteBalance
              proposal={proposal}
              voteBalance={voteBalance}
              balanceDetail={balanceDetail}
            />
          )}
          {belowThreshold && <RedText>Insufficient</RedText>}
        </>
      );
    }
  } else if (isSocietyProposal) {
    balanceInfo = <SocietyMemberHint />;
  } else if (isWhitelistProposal) {
    balanceInfo = (
      <WhitelistMemberHint whitelist={proposal?.networksConfig?.whitelist}>
        Only members can vote
      </WhitelistMemberHint>
    );
  }

  return (
    <>
      <ProxyHeader>
        {balanceInfo}
        {supportProxy && <ProxySwitch />}
      </ProxyHeader>
      {useProxy && (
        <PostAddress
          spaceId={proposal.space}
          proposalCid={proposal.cid}
          snapshot={snapshot}
        />
      )}
    </>
  );
}

function BalanceThresholdButton({
  children,
  balance,
  delegation,
  isLoading,
  disabled,
  ...props
}) {
  const useProxy = useSelector(useProxySelector);
  const proxyBalance = useSelector(proxyBalanceSelector);
  const proxyDelegation = useSelector(proxyDelegationSelector);

  const voteBalance = useProxy ? proxyBalance : balance;
  const voteDelegation = useProxy ? proxyDelegation : delegation;

  const belowThreshold = new BigNumber(voteBalance).eq(0);
  const canVote = !belowThreshold && !voteDelegation;

  return (
    <Button isLoading={isLoading} disabled={disabled || !canVote} {...props}>
      {children}
    </Button>
  );
}

function VoteButton({
  proposal,
  onVote,
  isLoading,
  choiceIndexes,
  balance,
  delegation,
}) {
  const canVote =
    choiceIndexes.length && proposalStatus.active === proposal?.status;

  const isSocietyProposal =
    proposal.networksConfig?.accessibility === "society";
  const isWhitelistProposal =
    proposal.networksConfig?.accessibility === "whitelist";

  const useProxy = useSelector(useProxySelector);

  const buttonText = useProxy ? "Proxy Vote" : "Vote";

  if (isSocietyProposal) {
    return (
      <SocietyMemberButton
        primary
        large
        block
        isLoading={isLoading}
        onClick={onVote}
        disabled={!canVote}
      >
        {buttonText}
      </SocietyMemberButton>
    );
  }

  if (isWhitelistProposal) {
    return (
      <WhitelistMemberButton
        primary
        large
        block
        isLoading={isLoading}
        onClick={onVote}
        disabled={!canVote}
        whitelist={proposal?.networksConfig?.whitelist}
      >
        {buttonText}
      </WhitelistMemberButton>
    );
  }

  return (
    <BalanceThresholdButton
      primary
      large
      block
      isLoading={isLoading}
      onClick={onVote}
      disabled={!canVote}
      balance={balance}
      delegation={delegation}
    >
      {buttonText}
    </BalanceThresholdButton>
  );
}

function ProposalActions({
  proposal,
  balance,
  balanceDetail,
  delegation,
  onVote,
  isLoading,
  choiceIndexes,
}) {
  return (
    <InnerWrapper>
      <BalanceInfo
        proposal={proposal}
        balance={balance}
        balanceDetail={balanceDetail}
        delegation={delegation}
      />

      <Flex>
        <VoteButton
          proposal={proposal}
          balance={balance}
          delegation={delegation}
          onVote={onVote}
          isLoading={isLoading}
          choiceIndexes={choiceIndexes}
        />

        <TerminateButton proposal={proposal} />
      </Flex>
    </InnerWrapper>
  );
}

function Remark({ remark, setRemark }) {
  return (
    <InnerWrapper>
      <Title>Remark</Title>
      <Input
        placeholder="What do you think about this proposal? (optional)"
        value={remark}
        onChange={(e) => setRemark(e.target.value)}
      />
    </InnerWrapper>
  );
}

function Options({ proposal, choiceIndexes, setChoiceIndexes }) {
  const onClickChoice = (index) => {
    if (choiceIndexes.includes(index)) {
      setChoiceIndexes(
        choiceIndexes.filter((choiceIndex) => choiceIndex !== index),
      );
    } else {
      if (proposal.choiceType === "single") {
        setChoiceIndexes([index]);
      } else {
        setChoiceIndexes([...choiceIndexes, index]);
      }
    }
  };

  const proposalClosed = isProposalClosed(proposal);

  return (
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
  );
}

function isProposalClosed(proposal) {
  return [proposalStatus.closed, proposalStatus.terminated].includes(
    proposal?.status,
  );
}

export default function PostVote({ proposal }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [choiceIndexes, setChoiceIndexes] = useState([]);
  const [remark, setRemark] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState();
  const [balanceDetail, setBalanceDetail] = useState([]);
  const [delegation, setDelegation] = useState();
  const viewfunc = useViewfunc();
  const useProxy = useSelector(useProxySelector);
  const proxyAddress = useSelector(proxySelector);
  const loginAddress = useSelector(loginAddressSelector);
  const { network: loginNetwork } = useSelector(loginNetworkSelector) || {};

  const snapshot = proposal.snapshotHeights[loginNetwork];

  const reset = () => {
    setChoiceIndexes([]);
    setRemark("");
  };

  const proposalClosed = isProposalClosed(proposal);

  useEffect(() => {
    if (proposal && loginAddress && loginNetwork) {
      nextApi
        .fetch(
          `${proposal.space}/proposal/${proposal.cid}/voterbalance/${loginNetwork}/${loginAddress}`,
          { snapshot },
        )
        .then((response) => {
          setBalance(response?.result?.balanceOf);
          setBalanceDetail(response?.result?.details);
          setDelegation(response?.result?.delegation);
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
        (choiceIndex) => proposal?.choices?.[choiceIndex],
      );

      signedData = await viewfunc.signVote(
        proposal?.space,
        proposal?.cid,
        choices,
        remark,
        loginAddress,
        useProxy ? proxyAddress : undefined,
        loginNetwork,
      );
    } catch (error) {
      const errorMessage = error.message;
      if (extensionCancelled !== errorMessage) {
        dispatch(newErrorToast(errorMessage));
      }
      setIsLoading(false);
      return;
    }

    const toastId = newToastId();
    dispatch(
      newPendingToast(toastId, "Saving and uploading the vote to IPFS..."),
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

  return (
    <Wrapper>
      <Options
        proposal={proposal}
        choiceIndexes={choiceIndexes}
        setChoiceIndexes={setChoiceIndexes}
      />
      {choiceIndexes.length > 0 && (
        <Remark remark={remark} setRemark={setRemark} />
      )}
      {!proposalClosed && (
        <ProposalActions
          proposal={proposal}
          balance={balance}
          balanceDetail={balanceDetail}
          delegation={delegation}
          onVote={onVote}
          isLoading={isLoading}
          choiceIndexes={choiceIndexes}
        />
      )}
    </Wrapper>
  );
}
