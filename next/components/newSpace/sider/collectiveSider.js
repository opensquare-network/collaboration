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

export default function CollectiveSider({
  name,
  imageFile,
  allStrategies,
  selectedStrategies,
  currentStep,
  members,
}) {
  const account = useSelector(accountSelector);

  const [isLoading, setIsLoading] = useState(false);
  const submit = () => {
    const params = {
      name,
      logo: imageFile,
      members,
      admins: [account.address],
    };
  };

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
        {currentStep === 2 && (
          <Button primary block onClick={submit} isLoading={isLoading}>
            Submit
          </Button>
        )}
      </MyPanel>
    </>
  );
}
