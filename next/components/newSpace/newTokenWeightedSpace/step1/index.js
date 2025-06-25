import { Button } from "@osn/common-ui";
import Logo from "./logo";
import { Sections } from "../../styled";
import Name, { checkName } from "./name";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MyDivider from "../../myDivider";

const NextButton = styled(Button)`
  padding: 12px 0;
`;

export default function Step1({
  imageFile,
  setImageFile,
  name,
  setName,
  onNextStep,
}) {
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

    onNextStep();
  };

  return (
    <>
      <MyDivider />
      <Sections>
        <Logo imageFile={imageFile} setImageFile={setImageFile} />
        <Name name={name} setName={setName} errorMsg={errorMsg} />
      </Sections>
      <NextButton
        disabled={!name || !imageFile}
        block
        onClick={() => handleNext()}
      >
        Next Step
      </NextButton>
    </>
  );
}
