import { useState } from "react";
import styled from "styled-components";

import Input from "components/input";
import DatePicker from "components/datePicker";
import Row from "@/components/row";
import { bigNumber2LocaleWithAbbr, toPrecision } from "../../frontedUtils";
import BigNumber from "bignumber.js";
import Button from "@/components/button";
import Loading from "../../public/imgs/icons/loading.svg";
import { useDispatch } from "react-redux";
import { popUpConnect } from "../../store/reducers/showConnectSlice";
import Tooltip from "@/components/tooltip";
import Toggle from "../toggle";
import PostAddress from "../postAddress";

const Wrapper = styled.div`
  min-width: 302px;
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  padding: 32px;
  @media screen and (max-width: 800px) {
    padding: 20px;
    margin: 0 -20px;
  }

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

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SystemWrapper = styled.div`
  background: #fbfcfe;
  padding: 12px 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #1e2134;
  border: 1px solid #e2e8f0;
`;

const Hint = styled.div`
  color: #ee4444;
`;

const ProxyVoteWrapper = styled.div``;

export default function More({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  height,
  balance,
  balanceError,
  setHeight,
  onPublish,
  isLoading,
  threshold,
  symbol,
  decimals,
  proxyPublish,
  setProxyPublish,
  proxyAddress,
  setProxyAddress,
  network,
  info,
  setInfo,
  setProxyBalance,
  setProxyCount,
  proxyBalance,
  proxyBalanceError,
  isInputting,
  setIsInputting,
}) {
  const thresholdFulfilled =
    new BigNumber(balance).comparedTo(new BigNumber(threshold)) >= 0;
  const proxyThresholdFulfilled =
    new BigNumber(Number(proxyBalance)).comparedTo(new BigNumber(threshold)) >=
    0;
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <InnerWrapper>
        <TitleWrapper>
          <Title>System</Title>
          <img src="/imgs/icons/action.svg" alt="" />
        </TitleWrapper>
        <SystemWrapper>Single choice voting</SystemWrapper>
      </InnerWrapper>
      <InnerWrapper>
        <TitleWrapper>
          <Title>Period</Title>
          <img src="/imgs/icons/timestamp.svg" alt="" />
        </TitleWrapper>
        <DatePicker
          date={startDate}
          setDate={setStartDate}
          placeholder="Start date"
        />
        <DatePicker
          date={endDate}
          setDate={setEndDate}
          placeholder="End date"
        />
      </InnerWrapper>
      <InnerWrapper>
        <TitleWrapper>
          <Title>Snapshot height</Title>
          <img src="/imgs/icons/block.svg" alt="" />
        </TitleWrapper>
        <Input
          placeholder="0"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </InnerWrapper>
      <InnerWrapper>
        <TitleWrapper>
          <Title>Information</Title>
          <img src="/imgs/icons/info.svg" alt="" />
        </TitleWrapper>
        {!proxyPublish && (
          <>
            {!new BigNumber(balance).isNaN() ? (
              thresholdFulfilled ? (
                <Row
                  header="Balance"
                  content={
                    <Tooltip
                      content={`${toPrecision(balance, decimals)} ${symbol}`}
                    >
                      {`${bigNumber2LocaleWithAbbr(
                        balance,
                        decimals
                      )} ${symbol}`}
                    </Tooltip>
                  }
                />
              ) : (
                <Hint>
                  You need to have a minimum of{" "}
                  {toPrecision(threshold, decimals)} {symbol} in order to
                  publish a proposal.
                </Hint>
              )
            ) : balanceError ? (
              <Hint>{balanceError}</Hint>
            ) : (
              <Row header="Balance" content={<Loading />} />
            )}
          </>
        )}
        {proxyPublish && (
          <>
            {!new BigNumber(proxyBalance).isNaN() && !isInputting ? (
              proxyThresholdFulfilled ? (
                <Row
                  header="Balance"
                  content={
                    <Tooltip
                      content={`${toPrecision(
                        proxyBalance,
                        decimals
                      )} ${symbol}`}
                    >
                      {`${bigNumber2LocaleWithAbbr(
                        proxyBalance,
                        decimals
                      )} ${symbol}`}
                    </Tooltip>
                  }
                />
              ) : (
                <Hint>
                  You need to have a minimum of{" "}
                  {toPrecision(threshold, decimals)} {symbol} in order to
                  publish a proposal.
                </Hint>
              )
            ) : proxyBalanceError ? (
              <Hint>{proxyBalanceError}</Hint>
            ) : (
              <Row header="Balance" content={<Loading />} />
            )}
          </>
        )}
        <ProxyVoteWrapper>
          <Row
            header="Proxy vote"
            content={
              <Toggle
                active={proxyPublish}
                onClick={() => {
                  setProxyPublish(!proxyPublish);
                }}
              />
            }
          />
        </ProxyVoteWrapper>
        {proxyPublish && (
          <PostAddress
            size="small"
            address={proxyAddress}
            setAddress={setProxyAddress}
            network={network}
            info={info}
            setInfo={setInfo}
            setProxyBalance={setProxyBalance}
            getProxyBalance={setProxyCount}
            setIsInputting={setIsInputting}
          />
        )}
      </InnerWrapper>
      {balanceError === "Link an address to create a proposal." ? (
        <Button large primary onClick={() => dispatch(popUpConnect())}>
          Connect Wallet
        </Button>
      ) : (
        <Button
          large
          primary
          onClick={onPublish}
          isLoading={
            isLoading ||
            new BigNumber(balance).isNaN() ||
            !thresholdFulfilled ||
            balanceError ||
            (proxyPublish &&
              (new BigNumber(proxyBalance).isNaN() ||
                !proxyThresholdFulfilled ||
                proxyBalanceError ||
                isInputting))
          }
        >
          {proxyPublish ? "Proxy Publish" : "Publish"}
        </Button>
      )}
    </Wrapper>
  );
}
