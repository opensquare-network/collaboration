import { useDispatch, useSelector } from "react-redux";
import { Button } from "@osn/common-ui";
import {
  currentStepSelector,
  setCurrentStep,
} from "store/reducers/newSpaceSlice";
import Steps from "../../steps";
import Logo from "./logo";
import Name from "./name";
import { MyPanel, MyDivider, Sections } from "../styled";

export default function Step1({
  steps,
  imageFile,
  setImageFile,
  name,
  setName,
}) {
  const dispatch = useDispatch();
  const currentStep = useSelector(currentStepSelector);

  const handleNext = () => {
    dispatch(setCurrentStep(1));
  };

  return (
    <MyPanel>
      <Steps steps={steps} currentStep={currentStep} />
      <MyDivider />
      <Sections>
        <Logo imageFile={imageFile} setImageFile={setImageFile} />
        <Name name={name} setName={setName} />
      </Sections>
      <Button block onClick={() => handleNext()}>
        Next
      </Button>
    </MyPanel>
  );
}
