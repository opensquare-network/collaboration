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

export default function CollectiveSider({
  name,
  imageFile,
  allStrategies,
  selectedStrategies,
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
      </MyPanel>
    </>
  );
}
