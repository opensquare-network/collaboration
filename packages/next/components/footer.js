import styled from "styled-components";

import ExternalLink from "./externalLink";
import { FOOTER_ITEMS } from "frontedUtils/constants";
import { p_16_normal, p_16_semibold } from "../styles/textStyles";

const Wrapper = styled.footer`
  flex: 0 0 auto;
  background: #191e27;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 80px 0;
  @media screen and (max-width: 1144px) {
    padding: 80px 32px;
  }
  @media screen and (max-width: 900px) {
    padding: 40px 20px 20px;
    flex-direction: column;
    > :not(:first-child) {
      margin-top: 40px;
    }
  }
`;

const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
`;

const LeftWrapper = styled.div`
  display: grid;
  row-gap: 32px;
  column-gap: 40px;
  grid-template-columns: repeat(4, 1fr);
  @media screen and (max-width: 760px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 360px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const List = styled.div`
  width: 160px;
`;

const Label = styled.div`
  ${p_16_semibold};
  margin-bottom: 24px;
  color: #ffffff;
`;

const ItemsWrapper = styled.ul`
  margin: 0;
  padding: 0;
  > :not(:first-child) > * {
    margin-top: 16px;
  }
`;

const Item = styled.span`
  display: flex;
  align-items: center;
  ${p_16_normal};
  color: rgba(255, 255, 255, 0.65);
  > img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
  &:hover {
    color: rgb(255, 255, 255);
  }
`;

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  > img {
    width: 68px;
    height: 48px;
    margin-bottom: 120px;
  }
  > div {
    text-align: right;
    ${p_16_normal};
    color: rgba(255, 255, 255, 0.35);
  }
  @media screen and (max-width: 900px) {
    align-items: flex-start;
    > img {
      margin-bottom: 0;
    }
    > div {
      text-align: left;
    }
  }
`;

const BottomWrapper = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.35);
  padding-bottom: 20px;
  text-align: center;
`;

export default function Footer() {
  return (
    <Wrapper>
      <Container>
        <ContentWrapper>
          <LeftWrapper>
            {FOOTER_ITEMS.map((item, index) => (
              <List key={index}>
                <Label>{item.label}</Label>
                <ItemsWrapper>
                  {item.items.map((item, index) => (
                    <li key={index}>
                      <ExternalLink href={item.link}>
                        <Item>
                          {item.icon && (
                            <img src={`/imgs/icons/${item.icon}`} alt="" />
                          )}
                          {item.name}
                        </Item>
                      </ExternalLink>
                    </li>
                  ))}
                </ItemsWrapper>
              </List>
            ))}
          </LeftWrapper>
          <RightWrapper>
            <img src="/imgs/opensquare-footer-logo.svg" alt="" />
          </RightWrapper>
        </ContentWrapper>
        <BottomWrapper>
          {`© ${new Date().getFullYear()} OpenSquare. All Rights Reserved.`}
        </BottomWrapper>
      </Container>
    </Wrapper>
  );
}
