import Step1 from "./step1";
import Step2 from "./step2";
import Sider from "../sider";
import Step3 from "./step3";
import { useState } from "react";
import Steps from "@/components/steps";
import { MainWrapper, MyPanel, SiderWrapper, Wrapper } from "../styled";
import { useDefaultLogo } from "hooks/useDefaultLogo";

export default function Content({ chainsDef, tokensDef }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [imageFile, setImageFile] = useState();
  const [name, setName] = useState("");
  const defaultLogo = useDefaultLogo({
    username: name,
    saturation: 50,
    lightness: 50,
  });
  const logoImage = imageFile || defaultLogo;
  const [assets, setAssets] = useState([]);
  const [proposalThreshold, setProposalThreshold] = useState("1");
  const [selectedOptions, setSelectedOptions] = useState([
    "balance-of",
    "quadratic-balance-of",
  ]);
  const options = [
    { value: "balance-of", text: "balance-of" },
    { value: "quadratic-balance-of", text: "quadratic-balance-of" },
  ];

  const steps = [
    { title: "Space profile" },
    { title: "Assets" },
    { title: "Strategies" },
  ];

  let symbol = "Token Symbol";
  let decimals = 12;
  if (assets?.length === 1) {
    symbol = assets[0].symbol;
    decimals = assets[0].decimals;
  } else if (assets?.length > 1) {
    symbol = "VOTE";
    decimals = Math.max(...assets.map((x) => x.decimals));
  }

  let stepContent = null;
  if (currentStep === 0) {
    stepContent = (
      <Step1
        imageFile={logoImage}
        setImageFile={setImageFile}
        name={name}
        setName={setName}
        onNextStep={() => setCurrentStep(1)}
      />
    );
  } else if (currentStep === 1) {
    stepContent = (
      <Step2
        chainsDef={chainsDef}
        tokensDef={tokensDef}
        assets={assets}
        setAssets={setAssets}
        onNextStep={() => setCurrentStep(2)}
        onBackStep={() => setCurrentStep(0)}
      />
    );
  } else if (currentStep === 2) {
    stepContent = (
      <Step3
        symbol={symbol}
        proposalThreshold={proposalThreshold}
        setProposalThreshold={setProposalThreshold}
        options={options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    );
  }

  return (
    <Wrapper>
      <MainWrapper>
        <MyPanel>
          <Steps steps={steps} currentStep={currentStep} />
          {stepContent}
        </MyPanel>
      </MainWrapper>
      <SiderWrapper>
        <Sider
          currentStep={currentStep}
          symbol={symbol}
          decimals={decimals}
          imageFile={imageFile}
          name={name}
          assets={assets}
          proposalThreshold={proposalThreshold}
          allStrategies={options}
          selectedStrategies={selectedOptions}
        />
      </SiderWrapper>
    </Wrapper>
  );
}
