import React from "react";
import styled from "styled-components";

const Text = styled.button`
  user-select: none;
  color: ${(props) => props.theme.primaryTurquoise500};
  background-color: transparent;
  border: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  &:hover {
    cursor: pointer;
  }
`;

function ToggleText({ isSetBanner, setIsSetBanner = () => {} }) {
  const handleSwitch = () => {
    setIsSetBanner(!isSetBanner);
  };

  return (
    <Text onClick={handleSwitch}>{isSetBanner ? "Cancel" : "Set Banner"}</Text>
  );
}

export default ToggleText;
