import { useEffect, useState } from "react";
import styled from "styled-components";
import DatePicker from "components/datePicker";
import BigNumber from "bignumber.js";
import Title from "@/components/styled/subTitle";
import { useDispatch, useSelector } from "react-redux";
import Information from "./information";
import SnapshotHeightPicker from "@/components/snapshotHeightPicker";
import { p_14_medium } from "../../styles/textStyles";
import {
  setSnapshotHeights,
  snapshotHeightsSelector,
} from "../../store/reducers/snapshotHeightSlice";
import QuestionMark from "../../public/imgs/icons/question-mark.svg";
import BlockIcon from "../../public/imgs/icons/block.svg";
import Tooltip from "@/components/tooltip";
import Flex from "@/components/styled/flex";
import { balanceSelector } from "../../store/reducers/accountSlice";
import { loadBalanceErrorSelector } from "../../store/reducers/statusSlice";
import Publish from "@/components/postCreate/publish";

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
  > .snapshot:not(:first-child) {
    margin-top: 0;
  }
  > :not(:first-child),
  > .snapshot:nth-child(2) {
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
  ${p_14_medium};
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
  onPublish,
  isLoading,
  threshold,
  symbol,
  decimals,
  proxyPublish,
  proxyAddress,
  setProxyAddress,
  space,
  setProxyBalance,
  proxyBalance,
  isInputting,
  setIsInputting,
}) {
  const balanceError = useSelector(loadBalanceErrorSelector);
  const balance = useSelector(balanceSelector);

  const thresholdFulfilled =
    new BigNumber(balance).comparedTo(new BigNumber(threshold)) >= 0;
  const proxyThresholdFulfilled =
    new BigNumber(Number(proxyBalance)).comparedTo(new BigNumber(threshold)) >=
    0;
  const dispatch = useDispatch();
  const [snapshotHeightDate, setSnapshotHeightDate] = useState();
  const snapshotHeights = useSelector(snapshotHeightsSelector);

  useEffect(() => {
    if (space?.networks) {
      dispatch(
        setSnapshotHeights(
          space?.networks.map((network) => ({
            network: network.network,
            height: 0,
          }))
        )
      );
    }
  }, [dispatch, space?.networks]);

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
          <Flex style={{ gap: 4 }}>
            <Title>Snapshot</Title>
            <Tooltip content={"Support multiple chain voting"} size="fit">
              <QuestionMark />
            </Tooltip>
          </Flex>
          <BlockIcon />
        </TitleWrapper>
        <DateWrapper>
          <SnapshotHeightPicker
            date={snapshotHeightDate}
            setDate={setSnapshotHeightDate}
            space={space}
          />
          {snapshotHeights?.map((snapshot) => (
            <Snapshot className="snapshot" key={snapshot.network}>
              <NetworkName>{snapshot.network}</NetworkName>
              <span>{snapshot.height?.toLocaleString()}</span>
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
          decimals={decimals}
          thresholdFulfilled={thresholdFulfilled}
          threshold={threshold}
          balanceError={balanceError}
          proxyBalance={proxyBalance}
          isInputting={isInputting}
          proxyThresholdFulfilled={proxyThresholdFulfilled}
          proxyAddress={proxyAddress}
          setProxyAddress={setProxyAddress}
          space={space}
          setIsInputting={setIsInputting}
          setProxyBalance={setProxyBalance}
          symbol={symbol}
        />
      </InnerWrapper>
      <Publish threshold={threshold} onPublish={onPublish} />
    </Wrapper>
  );
}
