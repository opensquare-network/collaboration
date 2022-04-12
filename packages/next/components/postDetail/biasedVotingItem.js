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

function BiasedVotingItem({ label = "", value, space }) {
  const Label = <div className="label">{label}</div>;

  return (
    <Wrapper>
      <LabelWrapper>
        {/*
          TODO: Should refactor, this is not a smart way to show the tooltip or not
        */}
        {label.length > 10 ? (
          <Tooltip content={label} size="full">
            {Label}
          </Tooltip>
        ) : (
          Label
        )}
      </LabelWrapper>

      <ValueDisplay value={value} space={space} />
    </Wrapper>
  );
}

export default BiasedVotingItem;
