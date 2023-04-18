import { useSelector } from "react-redux";
import Steps from "../../steps";
import { MyPanel, Sections } from "../styled";
import { currentStepSelector } from "store/reducers/newSpaceSlice";
import MyDivider from "../myDivider";

export default function Step3({ steps }) {
  const currentStep = useSelector(currentStepSelector);
  return (
    <MyPanel>
      <Steps steps={steps} currentStep={currentStep} />
      <MyDivider />
      <Sections></Sections>
    </MyPanel>
  );
}
