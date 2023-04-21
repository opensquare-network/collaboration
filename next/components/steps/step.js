import styled from "styled-components";
import CheckedIndex from "./checkedIndex";
import CurrentIndex from "./currentIndex";
import { Index, NavigationLine } from "./styled";
import { Flex } from "@osn/common-ui";

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Title = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: ${({ isCurrent }) => (isCurrent ? "#04D2C5" : "#000000")};
`;

export default function Step({ step, index = 0, currentStep = 0, isLast }) {
  const { title = "" } = step || {};
  const isCurrent = index === currentStep;
  const isPrevious = index < currentStep;
  const isFirst = index === 0;

  let indexBox = <Index>{index + 1}</Index>;
  if (isPrevious) {
    indexBox = <CheckedIndex />;
  } else if (isCurrent) {
    indexBox = <CurrentIndex>{index + 1}</CurrentIndex>;
  }

  return (
    <Wrapper>
      <Flex style={{ gap: "8px", width: "100%" }}>
        <NavigationLine isHidden={isFirst} />
        {indexBox}
        <NavigationLine isHidden={isLast} />
      </Flex>
      <Title isCurrent={isCurrent}>{title}</Title>
    </Wrapper>
  );
}
