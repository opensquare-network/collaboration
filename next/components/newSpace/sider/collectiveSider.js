import { MyPanel, SectionTitle } from "@/components/newSpace/styled";
import Logo from "@/components/newSpace/sider/logo";
import Strategies from "@/components/newSpace/sider/strategies";
import {
  FlexColumn,
  SpaceName,
  Sections,
  TokenSymbol,
  Items,
} from "@/components/newSpace/sider/styled";
import { Button } from "@osn/common-ui";
import { useState } from "react";
import { useSelector } from "react-redux";
import { accountSelector } from "store/reducers/accountSlice";
import { popUpConnect } from "store/reducers/showConnectSlice";
import { useDispatch } from "react-redux";

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

const ActionButton = ({ currentStep }) => {
  const account = useSelector(accountSelector);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const submit = () => {
    setIsLoading(true);
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
