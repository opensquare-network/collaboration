import styled from "styled-components";
import Step1 from "./step1";
import Step2 from "./step2";
import Sider from "./sider";
import { useSelector } from "react-redux";
import { currentStepSelector } from "store/reducers/newSpaceSlice";
import Step3 from "./step3";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 22px;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const MainWrapper = styled.div`
  flex: 1 1 auto;
  /* 100% - sider width - sider margin-left */
  max-width: calc(100% - 300px - 20px);
  > :not(:first-child) {
    margin-top: 20px;
  }
  @media screen and (max-width: 800px) {
    width: 100%;
    max-width: 100%;
  }
`;

const SiderWrapper = styled.div`
  flex: 0 0 300px;
  max-width: 300px;
  margin-left: 20px;
  > :not(:first-child) {
    margin-top: 20px;
  }
  @media screen and (max-width: 800px) {
    flex-basis: auto;
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
    max-width: none;
  }
`;

export default function Content() {
  const currentStep = useSelector(currentStepSelector);

  const steps = [
    { title: "Space profile" },
    { title: "Assets" },
    { title: "Strategies" },
  ];

  let stepContent = null;
  if (currentStep === 0) {
    stepContent = <Step1 steps={steps} />;
  } else if (currentStep === 1) {
    stepContent = <Step2 steps={steps} />;
  } else if (currentStep === 2) {
    stepContent = <Step3 steps={steps} />;
  }

  return (
    <Wrapper>
      <MainWrapper>{stepContent}</MainWrapper>
      <SiderWrapper>
        <Sider />
      </SiderWrapper>
    </Wrapper>
  );
}
