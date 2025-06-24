import { useDispatch, useSelector } from "react-redux";
import { Button } from "@osn/common-ui";
import {
  currentStepSelector,
  setCurrentStep,
} from "store/reducers/newSpaceSlice";
import Steps from "../../steps";
import Logo from "./logo";
import Name, { checkName } from "./name";
import { MyPanel, Sections } from "../styled";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MyDivider from "../myDivider";

const NextButton = styled(Button)`
  padding: 12px 0;
`;

export default function Step1({
  steps,
  imageFile,
  setImageFile,
  name,
  setName,
}) {
  const dispatch = useDispatch();
  const currentStep = useSelector(currentStepSelector);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setErrorMsg("");
  }, [name]);

  const handleNext = () => {
    const nameError = checkName(name);
    if (nameError) {
      setErrorMsg(nameError);
      return;
    }

    dispatch(setCurrentStep(1));
  };

  return (
    <MyPanel>
      <Steps steps={steps} currentStep={currentStep} />
      <MyDivider />
      <Sections>
        <Logo imageFile={imageFile} setImageFile={setImageFile} />
        <Name name={name} setName={setName} errorMsg={errorMsg} />
      </Sections>
      <NextButton block onClick={() => handleNext()}>
        Next
      </NextButton>
    </MyPanel>
  );
}
