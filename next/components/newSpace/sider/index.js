import BigNumber from "bignumber.js";
import { MyPanel, SectionTitle } from "../styled";
import Assets from "./assets";
import Logo from "./logo";
import Strategies from "./strategies";
import { useDispatch } from "react-redux";
import { Button } from "@osn/common-ui";
import { useCallback, useState } from "react";
import { newErrorToast, newSuccessToast } from "store/reducers/toastSlice";
import nextApi from "services/nextApi";
import { useRouter } from "next/router";
import isEmpty from "lodash.isempty";
import {
  FlexColumn,
  Items,
  SpaceName,
  TokenSymbol,
  Sections,
} from "@/components/newSpace/sider/styled";
import { useDefaultLogo } from "hooks/useDefaultLogo";
import { executeRecaptcha } from "@/components/reCaptcha";
import { isUseReCaptcha } from "frontedUtils";

export default function Sider({
  symbol,
  decimals,
  imageFile,
  name,
  assets,
  proposalThreshold,
  allStrategies,
  selectedStrategies,
  currentStep,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const defaultLogo = useDefaultLogo({
    username: name,
    saturation: 50,
    lightness: 50,
  });

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

    if (isUseReCaptcha()) {
      try {
        spaceData.captcha = await executeRecaptcha();
      } catch (error) {
        dispatch(newErrorToast("Recaptcha verification failed"));
        return;
      }
    }

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
        <Logo imageFile={imageFile || defaultLogo} />
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
