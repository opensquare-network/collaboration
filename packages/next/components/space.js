import styled, { css } from "styled-components";
import { useCallback, useEffect, useState } from "react";
import Plus from "public/imgs/icons/plus.svg";

import InternalLink from "./internalLink";
import {
  no_scroll_bar,
  shadow_100,
  shadow_200,
  makeSquare,
} from "../styles/globalCss";
import { h3_36_bold, p_18_semibold, p_16_semibold } from "../styles/textStyles";
import SpaceLogo from "@/components/spaceLogo";
import { useWindowSize } from "../frontedUtils/hooks";
import { setCookie } from "frontedUtils/cookie";

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
    ${shadow_200}
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

const AddSpaceLink = styled.a`
  ${p_16_semibold};
  color: #506176;
  display: none;
  @media screen and (min-width: 800px) {
    display: flex;
  }
  cursor: pointer;
  svg{
    margin-right: 8px;
  }
  &:hover{
    color: #506176;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 40px;
`

export default function Space({ spaces, showAllSpace }) {
  const [show, setShow] = useState(showAllSpace === "1");
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

  const setShowAllSpace = useCallback((show) => {
    setShow(show);
    setCookie("showallspace", show ? "1" : "0", 365);
  }, []);

  return (
    <div>
      <TitleWrapper>
        <Title>Space</Title>
        <ButtonWrapper>
          <AddSpaceLink href="mailto:yongfeng@opensquare.network">
            <Plus/>Add a Space
          </AddSpaceLink>
          <SpaceButton onClick={() => setShowAllSpace(!show)}>
            {spaceNames.length > showCount && show
              ? "Hide Spaces"
              : `All Spaces(${spaceNames.length})`}
          </SpaceButton>
        </ButtonWrapper>
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
