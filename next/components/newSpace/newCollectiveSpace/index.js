import Breadcrumb from "../../breadcrumb";
import {
  MainWrapper,
  MyPanel,
  SiderWrapper,
  Wrapper,
} from "@/components/newSpace/styled";
import Steps from "@/components/steps";
import { useMemo, useState } from "react";
import Step1 from "@/components/newSpace/newTokenWeightedSpace/step1";
import { useDefaultLogo } from "hooks/useDefaultLogo";
import MemberStep from "@/components/newSpace/newCollectiveSpace/memberStep";
import StrategiesStep from "@/components/newSpace/newCollectiveSpace/strategiesStep";
import CollectiveSider from "@/components/newSpace/sider/collectiveSider";

const options = [{ value: "one-person-one-vote", text: "one-person-one-vote" }];

export default function NewCollectiveSpace() {
  const [selectedStrategies] = useState(["one-person-one-vote"]);
  const [members, setMembers] = useState(["", ""]);
  const [currentStep, setCurrentStep] = useState(0);
  const [imageFile, setImageFile] = useState();
  const [name, setName] = useState("");
  const defaultLogo = useDefaultLogo({
    username: name,
    saturation: 50,
    lightness: 50,
  });
  const logoImage = imageFile || defaultLogo;

  const stepContent = useMemo(() => {
    if (currentStep === 0) {
      return (
        <Step1
          imageFile={logoImage}
          setImageFile={setImageFile}
          name={name}
          setName={setName}
          onNextStep={() => setCurrentStep(1)}
        />
      );
    } else if (currentStep === 1) {
      return (
        <MemberStep
          members={members}
          setMembers={setMembers}
          onNextStep={() => setCurrentStep(2)}
          onBackStep={() => setCurrentStep(0)}
        />
      );
    } else {
      return (
        <StrategiesStep
          options={options}
          selectedStrategies={selectedStrategies}
          onBackStep={() => setCurrentStep(1)}
        />
      );
    }
  }, [currentStep, logoImage, members, name, selectedStrategies]);
  return (
    <>
      <Breadcrumb
        routes={[{ name: "Home", link: "/" }, { name: "New Space" }]}
      />
      <Wrapper>
        <MainWrapper>
          <MyPanel>
            <Steps
              steps={[
                { title: "Profile" },
                { title: "Members" },
                { title: "Strategies" },
              ]}
              currentStep={currentStep}
            />
            {stepContent}
          </MyPanel>
        </MainWrapper>
        <SiderWrapper>
          <CollectiveSider
            name={name}
            imageFile={logoImage}
            allStrategies={options}
            selectedStrategies={selectedStrategies}
            currentStep={currentStep}
            members={members}
          />
        </SiderWrapper>
      </Wrapper>
    </>
  );
}
