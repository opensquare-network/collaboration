import { useEffect, useState } from "react";
import styled from "styled-components";
import DatePicker from "components/datePicker";
import { useDispatch, useSelector } from "react-redux";
import Information from "./information";
import SnapshotHeightPicker from "@/components/snapshotHeightPicker";
import { p_14_medium } from "../../styles/textStyles";
import {
  setSnapshotHeights,
  snapshotHeightsSelector,
} from "../../store/reducers/snapshotHeightSlice";
import Publish from "@/components/postCreate/publish";
import SideSectionTitle from "@/components/sideBar/sideSectionTitle";

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
  space,
}) {
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
        <SideSectionTitle title="System" img="/imgs/icons/action.svg" />
        <SystemWrapper>Single choice voting</SystemWrapper>
      </InnerWrapper>
      <InnerWrapper>
        <SideSectionTitle title="Period" img="/imgs/icons/date.svg" />
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
        <SideSectionTitle
          title="Snapshot"
          tooltip="Support multiple chain voting"
          img="/imgs/icons/block.svg"
        />
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
        <SideSectionTitle title="Information" img="/imgs/icons/info.svg" />
        <Divider />
        <Information space={space} />
      </InnerWrapper>
      <Publish threshold={space.proposeThreshold} onPublish={onPublish} />
    </Wrapper>
  );
}
