import { useSelector } from "react-redux";
import Steps from "../../steps";
import { MyPanel, Sections } from "../styled";
import { currentStepSelector } from "store/reducers/newSpaceSlice";
import MyDivider from "../myDivider";
import ProposalThreshold from "./proposalThreshold";
import Strategies from "./strategies";

export default function Step3({
  symbol,
  steps,
  proposalThreshold,
  setProposalThreshold,
  options,
  selectedOptions,
  setSelectedOptions,
}) {
  const currentStep = useSelector(currentStepSelector);
  return (
    <MyPanel>
      <Steps steps={steps} currentStep={currentStep} />
      <MyDivider />
      <Sections>
        <ProposalThreshold
          symbol={symbol}
          proposalThreshold={proposalThreshold}
          setProposalThreshold={setProposalThreshold}
        />
        <Strategies
          options={options}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      </Sections>
    </MyPanel>
  );
}
