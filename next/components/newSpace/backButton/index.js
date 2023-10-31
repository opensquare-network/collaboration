import { useDispatch, useSelector } from "react-redux";
import {
  currentStepSelector,
  setCurrentStep,
} from "store/reducers/newSpaceSlice";
import { ReactComponent as BackSVG } from "./back.svg";
import styled from "styled-components";
import { Button } from "@osn/common-ui";

const Wrapper = styled.div`
  > button {
    padding: 12px;
    line-height: 0;
  }
`;

export default function BackButton() {
  const dispatch = useDispatch();
  const currentStep = useSelector(currentStepSelector);

  const handleBack = () => {
    dispatch(setCurrentStep(currentStep - 1));
  };

  return (
    <Wrapper>
      <Button onClick={handleBack}>
        <BackSVG />
      </Button>
    </Wrapper>
  );
}
