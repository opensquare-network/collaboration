import styled, { css } from "styled-components";
import { useState } from "react";

import InternalLink from "./internalLink";
import { no_scroll_bar, shadow_100, makeSquare } from "../styles/globalCss";
import { h3_36_bold, p_18_semibold, p_16_semibold } from "../styles/textStyles";
import SpaceLogo from "@/components/spaceLogo";

const Title = styled.div`
  ${h3_36_bold};
`;

const ItemsWrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  overflow: scroll;
  ${no_scroll_bar};

  ${(p) =>
    p.show &&
    css`
      justify-content: space-around;
      grid-template-columns: repeat(auto-fill, 200px);
    `}

  @media screen and (max-width: 1144px) {
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
`;

const Name = styled.div`
  ${p_18_semibold};
  color: #2e343d;
  text-transform: capitalize;

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

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const SpaceButton = styled.div`
  cursor: pointer;
  ${p_16_semibold};
  color: #506176;
`;

export default function Space({ spaces }) {
  const [show, setShow] = useState(false);
  const spaceNames = Object.keys(spaces);

  return (
    <div>
      <TitleWrapper>
        <Title>Space</Title>
        <SpaceButton onClick={() => setShow(!show)}>
          {spaceNames.length > 5 && show ? "Hide Spaces" : `All Spaces(${spaceNames.length})`}
        </SpaceButton>
      </TitleWrapper>
      <ItemsWrapper show={show}>
        {(show ? spaceNames : spaceNames.slice(0, 5)).map((item, index) => (
          <Item key={index}>
            <IconWrapper>
              <Icon>
                <SpaceLogo src={`/imgs/icons/${item}.svg`} />
              </Icon>
              <InternalLink href={`/space/${item}`}>
                <Name>{item}</Name>
              </InternalLink>
              <Symbol>{spaces[item].symbol ?? "-"}</Symbol>
            </IconWrapper>
            <Divider />
            <ActiveWrapper>
              <ActiveCircle />
              <InternalLink href={`/space/${item}?tab=active`}>
              Active
              </InternalLink>
              <ActiveCount>{spaces[item].activeProposalsCount ?? 0}</ActiveCount>
            </ActiveWrapper>
          </Item>
        ))}
      </ItemsWrapper>
    </div>
  );
}
