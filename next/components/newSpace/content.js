import styled from "styled-components";
import Step1 from "./step1";
import Step2 from "./step2";
import Sider from "./sider";
import { useDispatch, useSelector } from "react-redux";
import {
  currentStepSelector,
  setCurrentStep,
} from "store/reducers/newSpaceSlice";
import Step3 from "./step3";
import { useEffect, useMemo, useState } from "react";
import { identicon } from "minidenticons";

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

const useDefaultLogo = ({ username, saturation, lightness }) => {
  const svgText = useMemo(
    () => identicon(username, saturation, lightness),
    [username, saturation, lightness],
  );
  if (!username) return null;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgText)}`;
};

export default function Content({ chainsDef, tokensDef }) {
  const dispatch = useDispatch();
  const currentStep = useSelector(currentStepSelector);
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

  useEffect(() => {
    dispatch(setCurrentStep(0));
  }, [dispatch]);

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
        steps={steps}
        imageFile={logoImage}
        setImageFile={setImageFile}
        name={name}
        setName={setName}
      />
    );
  } else if (currentStep === 1) {
    stepContent = (
      <Step2
        steps={steps}
        chainsDef={chainsDef}
        tokensDef={tokensDef}
        assets={assets}
        setAssets={setAssets}
      />
    );
  } else if (currentStep === 2) {
    stepContent = (
      <Step3
        symbol={symbol}
        steps={steps}
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
      <MainWrapper>{stepContent}</MainWrapper>
      <SiderWrapper>
        <Sider
          symbol={symbol}
          decimals={decimals}
          imageFile={logoImage}
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
