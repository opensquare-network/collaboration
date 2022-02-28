import { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "components/datePicker";
import BigNumber from "bignumber.js";
import Button from "@/components/button";
import Title from "@/components/styled/subTitle";
import { useDispatch, useSelector } from "react-redux";
import { popUpConnect } from "../../store/reducers/showConnectSlice";
import Information from "./information";
import SnapshotHeightPicker from "@/components/snapshotHeightPicker";
import { spaceConfigSelector } from "../../store/reducers/spaceConfigSlice";
import { p_14_medium } from "../../styles/textStyles";
import {
  setSnapshotHeights,
  snapshotHeightsSelector,
} from "../../store/reducers/snapshotHeightSlice";

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

const DateWrapper = styled.div`
  > :not(:first-child) {
    margin-top: 8px;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #f0f3f8;
`;

const Snapshot = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NetworkName = styled.div`
  ${p_14_medium};
  color: #506176;
  text-transform: capitalize;
`;
export default function More({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  balance,
  balanceError,
  onPublish,
  isLoading,
  threshold,
  symbol,
  decimals,
  proxyPublish,
  setProxyPublish,
  proxyAddress,
  setProxyAddress,
  space,
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
  const [snapshotHeightDate, setSnapshotHeightDate] = useState();
  const [snapshotHeightLoading, setSnapshotHeightLoading] = useState(false);
  const spaceConfig = useSelector(spaceConfigSelector);
  const snapshotHeights = useSelector(snapshotHeightsSelector);

  useEffect(() => {
    if (spaceConfig?.networks) {
      setSnapshotHeights(
        spaceConfig?.networks.map((network) => ({
          network: network.network,
          height: 0,
        }))
      );
    }
  }, [spaceConfig.networks]);

  function getMinEndDate() {
    if (!startDate || startDate < new Date()) {
      return new Date();
    }
    return startDate;
  }

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
          <img src="/imgs/icons/date.svg" alt="" />
        </TitleWrapper>
        <DateWrapper>
          <DatePicker
            date={startDate}
            setDate={setStartDate}
            placeholder="Start date"
          />
          <DatePicker
            minDate={getMinEndDate()}
            date={endDate}
            setDate={setEndDate}
            placeholder="End date"
          />
        </DateWrapper>
      </InnerWrapper>
      <InnerWrapper>
        <TitleWrapper>
          <Title>Snapshot</Title>
        </TitleWrapper>
        <DateWrapper>
          <SnapshotHeightPicker
            date={snapshotHeightDate}
            setDate={setSnapshotHeightDate}
          />
          {snapshotHeights?.map((snapshot) => (
            <Snapshot key={snapshot.network}>
              <NetworkName>{snapshot.network}</NetworkName>
              <span>{snapshot.height}</span>
            </Snapshot>
          ))}
        </DateWrapper>
        {/* {blocksMap.get(`${height}`) && (
          <Row
            header="Timestamp"
            content={moment(blocksMap.get(height)).format("MMM,DD YYYY HH:mm")}
          />
        )} */}
      </InnerWrapper>
      <InnerWrapper>
        <TitleWrapper>
          <Title>Information</Title>
          <img src="/imgs/icons/info.svg" alt="" />
        </TitleWrapper>
        <Divider />
        <Information
          balance={balance}
          decimals={decimals}
          thresholdFulfilled={thresholdFulfilled}
          threshold={threshold}
          balanceError={balanceError}
          proxyPublish={proxyPublish}
          proxyBalance={proxyBalance}
          isInputting={isInputting}
          proxyThresholdFulfilled={proxyThresholdFulfilled}
          proxyBalanceError={proxyBalanceError}
          setProxyPublish={setProxyPublish}
          proxyAddress={proxyAddress}
          setProxyAddress={setProxyAddress}
          space={space}
          info={info}
          setInfo={setInfo}
          setProxyCount={setProxyCount}
          setIsInputting={setIsInputting}
          setProxyBalance={setProxyBalance}
          symbol={symbol}
        />
      </InnerWrapper>
      {balanceError === "Link an address to create proposal." ? (
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
            (!proxyPublish &&
              (new BigNumber(balance).isNaN() ||
                !thresholdFulfilled ||
                balanceError)) ||
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
