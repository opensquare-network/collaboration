import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import Input from "components/input";
import { useViewfunc } from "frontedUtils/hooks";
import {
  loginAccountSelector,
  loginAddressSelector,
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
import { encodeAddress } from "@polkadot/util-crypto";
import ButtonPrimary from "@/components/button";
import Option from "@/components/option";
import { text_secondary_red_500 } from "../../styles/colorStyles";
import BigNumber from "bignumber.js";
import Toggle from "../toggle";
import { findNetworkConfig } from "services/util";

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

export default function PostVote({ proposal, space }) {
  const dispatch = useDispatch();
  const account = useSelector(loginAccountSelector);
  const [choiceIndex, setChoiceIndex] = useState(null);
  const [remark, setRemark] = useState("");
  const [proxyVote, setProxyVote] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [proxyAddress, setProxyAddress] = useState("");
  const [info, setInfo] = useState();
  const [balance, setBalance] = useState();
  const [proxyBalance, setProxyBalance] = useState(0);
  const viewfunc = useViewfunc();
  const router = useRouter();

  const loginAddress = useSelector(loginAddressSelector);

  const reset = () => {
    setChoiceIndex(null);
    setRemark("");
  };

  const status = proposal?.status;

  useEffect(() => {
    if (proposal && loginAddress && account?.network) {
      nextApi
        .fetch(
          `${proposal.space}/proposal/${proposal.cid}/voterbalance/${account.network}/${loginAddress}`,
          {
            snapshot: proposal.snapshotHeights[account.network],
          }
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
  }, [proposal, account?.network, loginAddress, dispatch]);

  useEffect(() => {
    const zero = new BigNumber("0");
    setIsLoading(
      new BigNumber(
        proxyVote ? proxyBalance ?? 0 : balance ?? 0
      ).isLessThanOrEqualTo(zero)
    );
  }, [balance, proxyVote, proxyBalance]);

  const getProxyBalance = (proxyAddress) => {
    if (proposal && proxyAddress && account?.network) {
      nextApi
        .fetch(
          `${proposal.space}/proposal/${proposal.cid}/voterbalance/${account.network}/${proxyAddress}`,
          {
            snapshot: proposal.snapshotHeights[account.network],
          }
        )
        .then((response) => {
          setProxyBalance(response?.result?.balance);
        })
        .catch((e) => {
          const message = e?.message || "Failed to get balance.";
          dispatch(addToast({ type: TOAST_TYPES.ERROR, message }));
        });
    } else {
      setProxyBalance(null);
    }
  };

  const onVote = async () => {
    if (isLoading) return;
    if (!viewfunc) {
      return;
    }
    if (!account) {
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
        encodeAddress(account?.address, account?.ss58Format),
        proxyVote
          ? encodeAddress(proxyAddress, account?.ss58Format)
          : undefined,
        account?.network
      );
    } catch (error) {
      if (error.toString() === "Error: Cancelled") {
        return;
      }
      dispatch(
        addToast({ type: TOAST_TYPES.ERROR, message: error.toString() })
      );
      setIsLoading(false);
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
    account?.network
  );

  return (
    <Wrapper>
      <InnerWrapper>
        <Title>
          {status && status !== "closed" ? "Cast your vote" : "Options"}
        </Title>
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
              disabled={!status || status === "closed"}
            >
              <div className="index">{`#${index + 1}`}</div>
              <div className="option">{item}</div>
            </Option>
          ))}
        </ButtonsWrapper>
      </InnerWrapper>
      {choiceIndex !== null && (
        <InnerWrapper>
          <Title>Remark</Title>
          <Input
            placeholder="What do you think about this proposal? (optional)"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </InnerWrapper>
      )}
      {status !== "closed" && (
        <InnerWrapper>
          <ProxyHeader>
            <div>
              {(proxyVote ? !isEmpty(proxyBalance) : !isEmpty(balance)) &&
                `Available ${toApproximatelyFixed(
                  bigNumber2Locale(
                    fromAssetUnit(
                      proxyVote ? proxyBalance : balance,
                      networkConfig?.decimals
                    )
                  )
                )} ${networkConfig?.symbol}`}
              {(proxyVote ? proxyBalance === "0" : balance === "0") && (
                <RedText>Insufficient</RedText>
              )}
            </div>
            <ToggleWrapper>
              <div>Proxy vote</div>
              <Toggle
                active={proxyVote}
                onClick={() => setProxyVote(!proxyVote)}
              />
            </ToggleWrapper>
          </ProxyHeader>
          {proxyVote && (
            <PostAddress
              address={proxyAddress}
              setAddress={setProxyAddress}
              space={networkConfig}
              info={info}
              setInfo={setInfo}
              setProxyBalance={setProxyBalance}
              getProxyBalance={getProxyBalance}
            />
          )}
          <ButtonPrimary
            primary
            large
            isLoading={isLoading}
            onClick={onVote}
            disabled={status === "pending"}
          >
            {proxyVote ? "Proxy Vote" : "Vote"}
          </ButtonPrimary>
        </InnerWrapper>
      )}
    </Wrapper>
  );
}
