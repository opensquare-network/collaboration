import MultiSelect from "@/components/multiSelect";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

export default function StrategiesSelector({
  options,
  selectedOptions,
  setSelectedOptions,
}) {
  return (
    <Wrapper>
      <MultiSelect
        options={options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    </Wrapper>
  );
}
