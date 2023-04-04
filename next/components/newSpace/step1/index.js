import Steps from "../../steps";
import Logo from "./logo";
import { useState } from "react";
import Name from "./name";
import { Button } from "@osn/common-ui";
import { useDispatch, useSelector } from "react-redux";
import {
  currentStepSelector,
  setCurrentStep,
} from "store/reducers/newSpaceSlice";
import { MyPanel, MyDivider, Sections } from "../styled";

export default function Step1({ steps }) {
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState();
  const [name, setName] = useState("");
  const currentStep = useSelector(currentStepSelector);

  return (
    <MyPanel>
      <Steps steps={steps} currentStep={currentStep} />
      <MyDivider />
      <Sections>
        <Logo imageFile={imageFile} setImageFile={setImageFile} />
        <Name name={name} setName={setName} />
      </Sections>
      <Button block onClick={() => dispatch(setCurrentStep(1))}>
        Next
      </Button>
    </MyPanel>
  );
}
