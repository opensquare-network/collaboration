import styled from "styled-components";
import Tooltip from "../tooltip";
import ValueDisplay from "../valueDisplay";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const LabelWrapper = styled.div`
  color: #506176;
  position: relative;
  display: flex;
  width: 60%;

  // for tooltip with size=fit
  > *:first-child {
    max-width: 100%;
  }

  .label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ValueDisplayWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 40%;
`;

function BiasedVotingItem({ label, value, space }) {
  return (
    <Wrapper>
      <LabelWrapper>
        <Tooltip content={label} size="fit">
          <div className="label">{label}</div>
        </Tooltip>
      </LabelWrapper>

      <ValueDisplayWrapper>
        <ValueDisplay value={value} space={space} />
      </ValueDisplayWrapper>
    </Wrapper>
  );
}

export default BiasedVotingItem;
