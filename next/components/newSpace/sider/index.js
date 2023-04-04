import { MyPanel, SectionTitle } from "../styled";
import Assets from "./assets";
import Logo from "./logo";
import styled from "styled-components";
import Strategies from "./strategies";

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

const Items = styled.div``;

export default function Sider({ imageFile, name }) {
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
        <Assets />
        <Strategies />
      </Items>
    </MyPanel>
  );
}
