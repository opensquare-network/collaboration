import { MyPanel, SectionTitle } from "@/components/newSpace/styled";
import Logo from "./logo";
import Strategies from "./strategies";
import { FlexColumn, SpaceName, Sections, TokenSymbol, Items } from "./styled";
import { Button } from "@osn/common-ui";
import { useState } from "react";
import { useSelector } from "react-redux";
import { accountSelector } from "store/reducers/accountSlice";
import { popUpConnect } from "store/reducers/showConnectSlice";
import { useDispatch } from "react-redux";
import nextApi from "services/nextApi";
import { newErrorToast, newSuccessToast } from "store/reducers/toastSlice";
import { useRouter } from "next/router";
import { executeRecaptcha } from "@/components/reCaptcha";
import { isUseReCaptcha } from "frontedUtils";

export default function CollectiveSider({
  name,
  imageFile,
  allStrategies,
  selectedStrategies,
  currentStep,
  members,
}) {
  return (
    <>
      <MyPanel>
        <SectionTitle>Summary</SectionTitle>
        <Sections>
          <Logo imageFile={imageFile} />
          <FlexColumn>
            <SpaceName>{name || "Name"}</SpaceName>
            <TokenSymbol>VOTE</TokenSymbol>
          </FlexColumn>
        </Sections>
        <Items>
          <Strategies
            options={allStrategies}
            selectedOptions={selectedStrategies}
          />
        </Items>
        <ActionButton
          currentStep={currentStep}
          params={{
            name,
            logo: imageFile,
            members,
          }}
        />
      </MyPanel>
    </>
  );
}

const ActionButton = ({ currentStep, params }) => {
  const account = useSelector(accountSelector);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const submit = async () => {
    const spaceData = {
      ...params,
      admins: [account.address],
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
    const { result, error } = await nextApi
      .post("spaces/collectives", spaceData)
      .finally(() => {
        setIsLoading(false);
      });
    if (error) {
      dispatch(newErrorToast(error.message));
    }
    if (result) {
      dispatch(newSuccessToast("Space created successfully"));
      router.push(`/space/${result.spaceId}`);
    }
  };

  if (currentStep !== 2) {
    return;
  }
  if (account?.address) {
    return (
      <Button primary block onClick={submit} isLoading={isLoading}>
        Submit
      </Button>
    );
  }
  return (
    <Button primary block onClick={() => dispatch(popUpConnect())}>
      Connect Wallet
    </Button>
  );
};
