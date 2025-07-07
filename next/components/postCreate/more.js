import { useEffect } from "react";
import styled from "styled-components";
import DatePicker from "components/datePicker";
import { useDispatch, useSelector } from "react-redux";
import Information from "./information";
import SnapshotHeightPicker from "@/components/snapshotHeightPicker";
import { p_14_medium } from "../../styles/textStyles";
import {
  authoringEndDateSelector,
  authoringStartDateSelector,
  choiceTypeIndexSelector,
  setChoiceTypeIndex,
  setEndTimestamp,
  setSnapshotHeights,
  setStartTimestamp,
  snapshotHeightsSelector,
} from "../../store/reducers/authoringSlice";
import Publish from "@/components/postCreate/publish";
import SideSectionTitle from "@/components/sideBar/sideSectionTitle";
import { FlexBetween } from "@osn/common-ui";
import DropdownSelector from "@osn/common-ui/es/DropdownSelector";
import { hasSocietyVoteStrategyOnly } from "frontedUtils/strategy";
import dayjs from "dayjs";
import { getChainDisplayName } from "frontedUtils/chain";
import { hasWhitelist, isCollectiveSpace } from "frontedUtils/space";

const Wrapper = styled.div`
  min-width: 302px;
  background: var(--fillBgPrimary);
  border: 1px solid var(--strokeBorderDefault);
  box-shadow: var(--shadowCardDefault);
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
  background-color: var(--fillBgTertiary);
`;

const Snapshot = styled(FlexBetween)`
  ${p_14_medium};
`;

const NetworkName = styled.div`
  ${p_14_medium};
  color: var(--textSecondary);
  text-transform: capitalize;
`;

const TextGrey = styled.span`
  color: var(--textTertiary);
`;

const ChoiceWrapper = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: var(--textPrimary);
`;

function SnapshotHeight({ space }) {
  const dispatch = useDispatch();
  const snapshotHeights = useSelector(snapshotHeightsSelector);

  useEffect(() => {
    if (space?.networks) {
      dispatch(
        setSnapshotHeights(
          space?.networks.map((network) => ({
            network: network.network,
            height: 0,
          })),
        ),
      );
    }
  }, [dispatch, space?.networks]);

  if (isCollectiveSpace(space.type) || hasWhitelist(space)) {
    return;
  }

  return (
    <InnerWrapper>
      <SideSectionTitle
        title="Snapshot"
        tooltip="Support multiple chain voting"
        img="/imgs/icons/block.svg"
      />
      <DateWrapper>
        <SnapshotHeightPicker space={space} />
        {space.networks?.map((network) => (
          <Snapshot className="snapshot" key={network.network}>
            <NetworkName>{getChainDisplayName(network.network)}</NetworkName>
            {snapshotHeights.find(
              (snapshotHeight) => snapshotHeight.network === network.network,
            )?.height || <TextGrey>-</TextGrey>}
          </Snapshot>
        ))}
      </DateWrapper>
    </InnerWrapper>
  );
}

function Period({ space }) {
  const dispatch = useDispatch();
  const authoringStartDate = useSelector(authoringStartDateSelector);
  const authoringEndDate = useSelector(authoringEndDateSelector);

  function getMinStartDate() {
    return dayjs().startOf("day").toDate();
  }

  function getMinEndDate() {
    if (!authoringStartDate || authoringStartDate < new Date()) {
      return new Date();
    }
    return authoringStartDate;
  }

  const isSocietyOnly = hasSocietyVoteStrategyOnly(space.weightStrategy);
  useEffect(() => {
    if (isSocietyOnly && authoringStartDate) {
      const endDate = dayjs(authoringStartDate).add(14, "day").toDate();
      dispatch(setEndTimestamp(endDate.getTime()));
    }
  }, [dispatch, isSocietyOnly, authoringStartDate]);

  return (
    <InnerWrapper>
      <SideSectionTitle title="Period" img="/imgs/icons/date.svg" />
      <DateWrapper>
        <DatePicker
          minDate={getMinStartDate()}
          date={authoringStartDate}
          setDate={(value) => {
            if (value?.getTime) {
              dispatch(setStartTimestamp(value.getTime()));
            }
          }}
          placeholder="Start date"
          defaultTime="now"
        />
        <DatePicker
          minDate={getMinEndDate()}
          date={authoringEndDate}
          setDate={(value) => {
            if (value?.getTime) {
              dispatch(setEndTimestamp(value?.getTime()));
            }
          }}
          placeholder="End date"
          disabled={isSocietyOnly}
        />
      </DateWrapper>
    </InnerWrapper>
  );
}

function ChoiceType() {
  const dispatch = useDispatch();
  const choiceTypeIndex = useSelector(choiceTypeIndexSelector);

  const choiceTypes = ["Single choice voting", "Multiple choice voting"].map(
    (item, i) => ({
      key: i,
      value: i,
      content: <ChoiceWrapper>{item}</ChoiceWrapper>,
    }),
  );

  return (
    <InnerWrapper>
      <SideSectionTitle title="System" img="/imgs/icons/action.svg" />
      <DropdownSelector
        options={choiceTypes}
        value={choiceTypeIndex}
        onSelect={(value) => dispatch(setChoiceTypeIndex(value))}
      />
    </InnerWrapper>
  );
}

export default function More({ onPublish, space }) {
  return (
    <Wrapper>
      <ChoiceType />
      <Period space={space} />
      <SnapshotHeight space={space} />
      <InnerWrapper>
        <SideSectionTitle title="Information" img="/imgs/icons/info.svg" />
        <Divider />
        <Information space={space} />
      </InnerWrapper>
      <Publish
        threshold={space.proposeThreshold}
        onPublish={onPublish}
        space={space}
      />
    </Wrapper>
  );
}
