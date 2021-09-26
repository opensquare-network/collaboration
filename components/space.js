import styled, { css } from "styled-components";
import { SPACE_ITEMS } from "utils/constants";
import InternalLink from "./internalLink";
import { no_scroll_bar, shadow_100, makeSquare } from "../styles/globalCss";
import { h3_36_bold, p_16_semibold, p_18_semibold } from "../styles/textStyles";
import { useState } from "react";

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${h3_36_bold};
  margin-bottom: 40px;
`;

const ItemsWrapper = styled.div`
  display: flex;
  justify-content: start;
  ${(p) =>
          p.folded &&
          css`
            overflow-x: scroll;
            flex-wrap: nowrap;
          `}
  ${(p) =>
          !p.folded &&
          css`
            flex-wrap: wrap;
          `}
  ${no_scroll_bar};
  
  > :not(:first-child) {
    margin-bottom: 20px;
    margin-left: 20px;
  }
  
  > :nth-child(6n){
    margin-left: 0;
  }

  @media screen and(max-width: 1144px) {
    margin: 0 -32px;
    padding: 0 32px;
  }
  @media screen and (max-width: 800px) {
    margin: 0 -20px;
    padding: 0 20px;
  }
`;

const Item = styled.div`
  width: 200px;
  height: 241px;
  flex: 0 0 auto;
  border: 1px solid #f0f3f8;
  ${shadow_100};
  background: #ffffff;
  padding: 32px;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.div`
  ${makeSquare(64)};
  margin-bottom: 16px;

  > img {
    ${makeSquare(64)};
  }
`;

const DefaultIcon = styled.div`
  ${makeSquare(64)};
  border-radius: 50%;
  background: #fbfcfe;
  border: 1px solid #e2e8f0;
`;

const Name = styled.div`
  ${p_16_semibold};
  color: #2e343d;

  :hover {
    text-decoration: underline;
  }
`;

const Symbol = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: #a1a8b3;
`;

const Divider = styled.div`
  height: 1px;
  background: #f0f3f8;
  margin: 12px 0;
`;

const ActiveWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 24px;
  color: #a1a8b3;
`;

const ActiveCircle = styled.div`
  ${makeSquare(6)};
  border-radius: 50%;
  background: #56ca2f;
  margin-right: 8px;
`;

const ActiveCount = styled.div`
  margin-left: auto;
`;

const FoldButton = styled.p`
  ${p_18_semibold};
  cursor: pointer;
`

export default function Space() {
  const [folded, setFolded] = useState(true);
  return (
    <div>
      <Title>
        Space
        <FoldButton onClick={() => {
          setFolded(!folded)
        }}>All Spaces(20)</FoldButton>
      </Title>
      <ItemsWrapper folded={folded}>
        {SPACE_ITEMS.map((item, index) => (
          <Item key={index}>
            <IconWrapper>
              <Icon>
                {item.icon && <img src={`/imgs/icons/${item.icon}`} alt=""/>}
                {!item.icon && <DefaultIcon/>}
              </Icon>
              <InternalLink href={`/space/${item.value}`}>
                <Name>{item.name}</Name>
              </InternalLink>
              <Symbol>{item.symbol ?? "-"}</Symbol>
            </IconWrapper>
            <Divider/>
            <ActiveWrapper>
              <ActiveCircle/>
              Active
              <ActiveCount>{item.active ?? 0}</ActiveCount>
            </ActiveWrapper>
          </Item>
        ))}
      </ItemsWrapper>
    </div>
  );
}
