import styled from "styled-components";

import Input from "components/input";
import DatePicker from "components/datePicker";
import Row from "@/components/row";
import { toPrecision } from "../../frontedUtils";
import BigNumber from "bignumber.js";
import Button from "@/components/button";
import Loading from "../../public/imgs/icons/loading.svg";
import { setAccount } from "../../store/reducers/accountSlice";
import { useDispatch } from "react-redux";
import { closeConnect, popUpConnect, showConnect } from "../../store/reducers/showConnectSlice";

const Wrapper = styled.div`
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
  color: #EE4444;
`

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
                             }) {
  const thresholdFulfilled = (new BigNumber(balance)).comparedTo(new BigNumber(threshold)) >= 0;
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <InnerWrapper>
        <TitleWrapper>
          <Title>System</Title>
          <img src="/imgs/icons/action.svg" alt=""/>
        </TitleWrapper>
        <SystemWrapper>Single choice voting</SystemWrapper>
      </InnerWrapper>
      <InnerWrapper>
        <TitleWrapper>
          <Title>Period</Title>
          <img src="/imgs/icons/timestamp.svg" alt=""/>
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
          <img src="/imgs/icons/block.svg" alt=""/>
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
          <img src="/imgs/icons/info.svg" alt=""/>
        </TitleWrapper>
        {
          !(new BigNumber(balance)).isNaN() ? (
              thresholdFulfilled
                ? <Row header="Balance" content={`${toPrecision(balance, decimals)} ${symbol}`}/>
                : <Hint>You need to have a minimum of {toPrecision(threshold, decimals)} {symbol} in order to publish a
                  proposal.</Hint>
            )
            : (balanceError ? <Hint>{balanceError}</Hint> : <Row header="Balance" content={<Loading/>}/>)
        }
      </InnerWrapper>
      {balanceError === "Link an address to create a proposal." ?
        <Button large primary onClick={() => dispatch(popUpConnect())}>
          Connect Wallet
        </Button> :
        <Button large primary onClick={onPublish}
                isLoading={isLoading || (new BigNumber(balance)).isNaN() || !thresholdFulfilled || balanceError}>
          Publish
        </Button>
      }
    </Wrapper>
  );
}
