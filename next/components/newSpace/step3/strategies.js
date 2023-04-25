import MultiSelect from "@/components/multiSelect";
import styled from "styled-components";
import { SectionTitle } from "../styled";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Strategies({
  options,
  selectedOptions,
  setSelectedOptions,
}) {
  return (
    <Wrapper>
      <SectionTitle>Strategies</SectionTitle>
      <MultiSelect
        options={options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    </Wrapper>
  );
}
