import Steps from "../../steps";
import { Button } from "@osn/common-ui";
import { useDispatch, useSelector } from "react-redux";
import {
  currentStepSelector,
  setCurrentStep,
} from "store/reducers/newSpaceSlice";
import { MyPanel, MyDivider, Sections } from "../styled";

export default function Step2({ steps }) {
  const dispatch = useDispatch();
  const currentStep = useSelector(currentStepSelector);

  return (
    <MyPanel>
      <Steps steps={steps} currentStep={currentStep} />
      <MyDivider />
      <Sections></Sections>
      <Button block onClick={() => dispatch(setCurrentStep(2))}>
        Next
      </Button>
    </MyPanel>
  );
}
