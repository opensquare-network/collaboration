import styled from "styled-components";
import Step from "./step";

const Wrapper = styled.div`
  display: flex;
`;

export default function Steps({ steps = [], currentStep = 0 }) {
  return (
    <Wrapper>
      {steps.map((step, index) => (
        <Step
          step={step}
          index={index}
          currentStep={currentStep}
          isLast={index === steps.length - 1}
        />
      ))}
    </Wrapper>
  );
}
