import BigNumber from "bignumber.js";
import { MyPanel, SectionTitle } from "../styled";
import Assets from "./assets";
import Logo from "./logo";
import styled from "styled-components";
import Strategies from "./strategies";
import { currentStepSelector } from "store/reducers/newSpaceSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@osn/common-ui";
import { useCallback, useState } from "react";
import { newErrorToast, newSuccessToast } from "store/reducers/toastSlice";
import nextApi from "services/nextApi";
import { useRouter } from "next/router";
import isEmpty from "lodash.isempty";

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
  symbol,
  decimals,
  imageFile,
  name,
  assets,
  proposalThreshold,
  allStrategies,
  selectedStrategies,
}) {
  const dispatch = useDispatch();
  const currentStep = useSelector(currentStepSelector);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const verifyData = useCallback(() => {
    if (isNaN(proposalThreshold)) {
      dispatch(newErrorToast("Proposal threshold must be a number"));
      return false;
    }

    if (proposalThreshold < 0) {
      dispatch(newErrorToast("Proposal threshold must not be less then 0"));
      return false;
    }

    if (!selectedStrategies.length) {
      dispatch(newErrorToast("At least one strategy is required"));
      return false;
    }

    return true;
  }, [dispatch, proposalThreshold, selectedStrategies]);

  const submit = useCallback(async () => {
    if (!verifyData()) {
      return;
    }

    const spaceData = {
      name,
      symbol,
      decimals,
      logo: imageFile,
      assets: assets?.map((item) => ({
        ...item,
        assetId: isEmpty(item.assetId) ? undefined : parseInt(item.assetId),
        votingWeight: parseInt(item.votingWeight),
        votingThreshold: new BigNumber(item.votingThreshold)
          .times(Math.pow(10, item.decimals))
          .toFixed(),
      })),
      weightStrategy: selectedStrategies,
      proposalThreshold: new BigNumber(proposalThreshold)
        .times(Math.pow(10, decimals))
        .toFixed(),
    };

    setIsLoading(true);
    try {
      const { result, error } = await nextApi.post("spaces", spaceData);
      if (error) {
        dispatch(newErrorToast(error.message));
      }
      if (result) {
        dispatch(newSuccessToast("Space created successfully"));
        router.push(`/space/${result.spaceId}`);
      }
    } finally {
      setIsLoading(false);
    }
  }, [
    router,
    dispatch,
    verifyData,
    imageFile,
    name,
    symbol,
    decimals,
    assets,
    proposalThreshold,
    selectedStrategies,
  ]);

  return (
    <MyPanel>
      <SectionTitle>Summary</SectionTitle>
      <Sections>
        <Logo imageFile={imageFile} />
        <FlexColumn>
          <SpaceName>{name || "Name"}</SpaceName>
          <TokenSymbol>{symbol || "Token Symbol"}</TokenSymbol>
        </FlexColumn>
      </Sections>
      <Items>
        <Assets assets={assets} />
        <Strategies
          options={allStrategies}
          selectedOptions={selectedStrategies}
        />
        {currentStep === 2 && (
          <Button primary block onClick={submit} isLoading={isLoading}>
            Submit
          </Button>
        )}
      </Items>
    </MyPanel>
  );
}
