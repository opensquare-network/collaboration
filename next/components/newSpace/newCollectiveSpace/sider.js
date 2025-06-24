import { MyPanel, SectionTitle } from "@/components/newSpace/styled";
import Logo from "@/components/newSpace/sider/logo";
import Assets from "@/components/newSpace/sider/assets";
import Strategies from "@/components/newSpace/sider/strategies";

export default function Sider() {
  return (
    <>
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
    </>
  );
}
