import { Button } from "@osn/common-ui";
import Logo from "./logo";
import Name from "./name";
import { Sections } from "../../styled";
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
    if (!name) {
      setErrorMsg("Space name cannot be empty");
      return;
    }

    if (name.length > 20) {
      setErrorMsg("Space name cannot exceed 20 characters");
      return;
    }

    if (!/^[a-zA-Z0-9_\-\s]+$/.test(name)) {
      setErrorMsg(
        "Only letters, numbers, spaces, underscores and hyphens are allowed",
      );
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
