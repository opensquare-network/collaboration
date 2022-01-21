import React from "react";
import styled, { css } from "styled-components";
import { useEffect, useState } from "react";

import InternalLink from "./internalLink";
import { no_scroll_bar, shadow_100, makeSquare } from "../styles/globalCss";
import { h3_36_bold, p_18_semibold, p_16_semibold } from "../styles/textStyles";
import SpaceLogo from "./spaceLogo";
import { useWindowSize } from "../frontedUtils/hooks";

const Title = styled.div`
  ${h3_36_bold};
`;

const ItemsWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: start;
  overflow: visible;
  min-height: 227px;
  ${no_scroll_bar};

  @media screen and (max-width: 1144px) {
    margin: 0 -32px;
    padding: 0 32px;
  }
  @media screen and (max-width: 800px) {
    margin: 0 -20px;
    padding: 0 20px;
  }

  ${(p) =>
    p.show &&
    css`
      flex-wrap: wrap;
    `}
`;

const Item = styled.div`
  flex: 0 0 auto;
  border: 1px solid #f0f3f8;
  ${shadow_100};
  background: #ffffff;
  padding: 24px;
  cursor: pointer;
  width: 163.33px;

  :hover {
    border-color: #e2e8f0;
  }
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
  white-space: nowrap;
  ${p_18_semibold};
  color: #2e343d;
  text-transform: capitalize;
`;

const Symbol = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: #a1a8b3;
`;

const Divider = styled.div`
  min-width: 116px;
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
  margin-bottom: 24px;
`;

const SpaceButton = styled.div`
  cursor: pointer;
  ${p_16_semibold};
  color: #506176;
`;

export default function Space({ spaces = {} }) {
  const [show, setShow] = useState(false);
  const [showCount, setShowCount] = useState(6);

  const spaceNames = Object.keys(spaces)?.sort(
    (a, b) => (a === "rmrk" || (a === "rmrk-curation" && b !== "rmrk")) && -1
  );
  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width > 800) {
      setShowCount(6);
    } else {
      setShowCount(2);
    }
  }, [windowSize.width, setShowCount]);

  return (
    <div>
      <TitleWrapper>
        <Title>Space</Title>
        <SpaceButton onClick={() => setShow(!show)}>
          {spaceNames.length > showCount && show
            ? "Hide Spaces"
            : `All Spaces(${spaceNames.length})`}
        </SpaceButton>
      </TitleWrapper>
      <ItemsWrapper show={show}>
        {(show ? spaceNames : spaceNames.slice(0, showCount)).map(
          (item, index) => (
            <InternalLink href={`/space/${item}`} key={index}>
              <Item>
                <IconWrapper>
                  <Icon>
                    <SpaceLogo spaceId={item} />
                  </Icon>
                  <Name>{spaces[item].name}</Name>
                  <Symbol>{spaces[item].symbol ?? "-"}</Symbol>
                </IconWrapper>
                <Divider />
                <ActiveWrapper>
                  <ActiveCircle />
                  <InternalLink href={`/space/${item}?tab=active`}>
                    Active
                  </InternalLink>
                  <ActiveCount>
                    {spaces[item].activeProposalsCount ?? 0}
                  </ActiveCount>
                </ActiveWrapper>
              </Item>
            </InternalLink>
          )
        )}
      </ItemsWrapper>
    </div>
  );
}
