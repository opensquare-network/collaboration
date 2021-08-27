import styled from "styled-components";

import ExternalLink from "./externalLink";
import { FOOTER_ITEMS } from "utils/constants";
import Container from "./container";

const Wrapper = styled.footer`
  flex: 0 0 auto;
  background: #191e27;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 80px 52px;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const List = styled.div`
  width: 160px;
  :not(:first-child) {
    margin-left: 40px;
  }
`;

const Label = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 24px;
  color: #ffffff;
`;

const ItemsWrapper = styled.div`
  > :not(:first-child) > * {
    margin-top: 16px;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.65);
  > img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
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
    font-size: 16px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.35);
    white-space: nowrap;
  }
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
                    <ExternalLink href={item.link} key={index}>
                      <Item>
                        {item.icon && <img src={`/imgs/icons/${item.icon}`} />}
                        {item.name}
                      </Item>
                    </ExternalLink>
                  ))}
                </ItemsWrapper>
              </List>
            ))}
          </LeftWrapper>
          <RightWrapper>
            <img src="/imgs/opensquare-footer-logo.svg" />
            <div>{`© ${new Date().getFullYear()} OpenSquare. All Rights Reserved.`}</div>
          </RightWrapper>
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
}
