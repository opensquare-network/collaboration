import styled from "styled-components";
import Step from "./step";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

export default function Steps({ steps = [], currentStep = 0 }) {
  return (
    <Wrapper>
      {steps.map((step, index) => (
        <Step
          key={index}
          step={step}
          index={index}
          currentStep={currentStep}
          isLast={index === steps.length - 1}
        />
      ))}
    </Wrapper>
  );
}
