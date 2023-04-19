import { MyPanel, SectionTitle } from "../styled";
import Assets from "./assets";
import Logo from "./logo";
import styled from "styled-components";
import Strategies from "./strategies";
import { currentStepSelector } from "store/reducers/newSpaceSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@osn/common-ui";
import { useCallback } from "react";
import { newErrorToast } from "store/reducers/toastSlice";

const Sections = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const SpaceName = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: #1e2134;
`;

const TokenSymbol = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  color: #a1a8b3;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default function Sider({
  imageFile,
  name,
  assets,
  proposalThreshold,
  options,
  selectedOptions,
}) {
  const dispatch = useDispatch();
  const currentStep = useSelector(currentStepSelector);

  const verifyData = useCallback(() => {
    if (isNaN(proposalThreshold)) {
      dispatch(newErrorToast("Proposal threshold must be a number"));
      return false;
    }

    if (proposalThreshold < 0) {
      dispatch(newErrorToast("Proposal threshold must not be less then 0"));
      return false;
    }

    if (!selectedOptions.length) {
      dispatch(newErrorToast("At least one strategy is required"));
      return false;
    }

    return true;
  }, [dispatch, proposalThreshold, selectedOptions]);

  const submit = useCallback(() => {
    if (!verifyData()) {
      return;
    }
  }, [verifyData]);

  return (
    <MyPanel>
      <SectionTitle>Summary</SectionTitle>
      <Sections>
        <Logo imageFile={imageFile} />
        <FlexColumn>
          <SpaceName>{name || "Name"}</SpaceName>
          <TokenSymbol>Token Symbol</TokenSymbol>
        </FlexColumn>
      </Sections>
      <Items>
        <Assets assets={assets} />
        <Strategies options={options} selectedOptions={selectedOptions} />
        {currentStep === 2 && (
          <Button primary block onClick={submit}>
            Submit
          </Button>
        )}
      </Items>
    </MyPanel>
  );
}
