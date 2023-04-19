import { useSelector } from "react-redux";
import Steps from "../../steps";
import { MyPanel, Sections } from "../styled";
import { currentStepSelector } from "store/reducers/newSpaceSlice";
import MyDivider from "../myDivider";
import ProposalThreshold from "./proposalThreshold";
import StrategiesSelector from "./strategiesSelector";

export default function Step3({
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
          proposalThreshold={proposalThreshold}
          setProposalThreshold={setProposalThreshold}
        />
        <StrategiesSelector
          options={options}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      </Sections>
    </MyPanel>
  );
}
