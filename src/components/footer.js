import styled from "styled-components";

import ExternalLink from "./externalLink";
import { FOOTER_ITEMS } from "utils/constants";

const Wrapper = styled.footer`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex: 0 0 auto;
  padding: 80px 52px;
  background: #191e27;
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

export default function Footer() {
  return (
    <Wrapper>
      <LeftWrapper>
        {FOOTER_ITEMS.map((item, index) => (
          <List key={index}>
            <Label>{item.label}</Label>
            <ItemsWrapper>
              {item.items.map((item, index) => (
                <ExternalLink href={item.link}>
                  <Item key={index}>
                    {item.icon && <img src={`/imgs/icons/${item.icon}`} />}
                    {item.name}
                  </Item>
                </ExternalLink>
              ))}
            </ItemsWrapper>
          </List>
        ))}
      </LeftWrapper>
    </Wrapper>
  );
}
