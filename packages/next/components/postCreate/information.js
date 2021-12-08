import styled from "styled-components";

import Row from "@/components/row";
import Tooltip from "@/components/tooltip";
import Loading from "../../public/imgs/icons/loading.svg";
import Toggle from "../toggle";
import PostAddress from "../postAddress";
import BigNumber from "bignumber.js";
import { bigNumber2LocaleWithAbbr, toPrecision } from "../../frontedUtils";

const Hint = styled.div`
  margin-top: 4px !important;
  color: #ee4444;
`;

const ProxyVoteWrapper = styled.div`
  margin-top: 4px !important;
`;

const PostAddressWrapper = styled.div`
  margin-top: 4px !important;
`;

const Placeholder = styled.div`
  height: 8px;
  margin-top: 0 !important;
`;

export default function Information({
  balance,
  decimals,
  thresholdFulfilled,
  threshold,
  balanceError,
  proxyPublish,
  proxyBalance,
  isInputting,
  proxyThresholdFulfilled,
  proxyBalanceError,
  setProxyPublish,
  proxyAddress,
  setProxyAddress,
  network,
  info,
  setInfo,
  setProxyCount,
  setIsInputting,
  setProxyBalance,
  symbol,
}) {
  return (
    <>
      {!proxyPublish && (
        <>
          {!new BigNumber(balance).isNaN() ? (
            <>
              <Row
                header="Balance"
                content={
                  <Tooltip
                    content={`${toPrecision(balance, decimals)} ${symbol}`}
                  >
                    {`${bigNumber2LocaleWithAbbr(balance, decimals)} ${symbol}`}
                  </Tooltip>
                }
              />
              {!thresholdFulfilled && (
                <Hint>
                  You need to have a minimum of{" "}
                  {toPrecision(threshold, decimals)} {symbol} in order to
                  publish a proposal.
                </Hint>
              )}
            </>
          ) : balanceError ? (
            <>
              <Placeholder />
              <Hint>{balanceError}</Hint>
            </>
          ) : (
            <Row header="Balance" content={<Loading />} />
          )}
        </>
      )}
      {proxyPublish && (
        <>
          {!new BigNumber(proxyBalance).isNaN() && !isInputting ? (
            <>
              <Row
                header="Balance"
                content={
                  <Tooltip
                    content={`${toPrecision(proxyBalance, decimals)} ${symbol}`}
                  >
                    {`${bigNumber2LocaleWithAbbr(
                      proxyBalance,
                      decimals
                    )} ${symbol}`}
                  </Tooltip>
                }
              />
              {!proxyThresholdFulfilled && (
                <Hint>
                  You need to have a minimum of{" "}
                  {toPrecision(threshold, decimals)} {symbol} in order to
                  publish a proposal.
                </Hint>
              )}
            </>
          ) : proxyBalanceError ? (
            <>
              <Row header="Balance" content={`0 ${symbol}`} />
              <Hint>{proxyBalanceError}</Hint>
            </>
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
        <PostAddressWrapper>
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
            flag={false}
          />
        </PostAddressWrapper>
      )}
    </>
  );
}
