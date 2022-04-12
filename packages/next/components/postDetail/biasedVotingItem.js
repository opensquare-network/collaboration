import styled from "styled-components";
import Tooltip from "../tooltip";
import ValueDisplay from "../valueDisplay";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-item: center;
  width: 100%;
`;

const LabelWrapper = styled.div`
  color: #506176;
  position: relative;
  width: 50%;

  .label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

function BiasedVotingItem({ label, value, space }) {
  return (
    <Wrapper>
      <LabelWrapper>
        <Tooltip content={label} size="fit">
          <div className="label">{label}</div>
        </Tooltip>
      </LabelWrapper>

      <ValueDisplay value={value} space={space} />
    </Wrapper>
  );
}

export default BiasedVotingItem;
