import MultiSelect from "@/components/multiSelect";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

export default function StrategiesSelector({
  selectedOptions,
  setSelectedOptions,
}) {
  const options = [
    { value: "balance-of", text: "balance-of" },
    { value: "quadratic-balance-of", text: "quadratic-balance-of" },
  ];

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
