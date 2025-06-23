import { Sections } from "../../styled";
import MyDivider from "../../myDivider";
import ProposalThreshold from "./proposalThreshold";
import Strategies from "./strategies";

export default function Step3({
  symbol,
  proposalThreshold,
  setProposalThreshold,
  options,
  selectedOptions,
  setSelectedOptions,
}) {
  return (
    <>
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
    </>
  );
}
