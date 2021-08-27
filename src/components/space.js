import styled from "styled-components";

import { SPACE_ITEMS } from "utils/constants";
import InternalLink from "./internalLink";

const Title = styled.div`
  font-weight: bold;
  font-size: 36px;
  line-height: 40px;
  margin-bottom: 40px;
`;

const ItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Item = styled.div`
  width: 203.2px;
  height: 241px;
  flex: 0 0 auto;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  background: #ffffff;
  padding: 32px;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.div`
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  > img {
    width: 64px;
    height: 64px;
  }
`;

const DefaultIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #fbfcfe;
  border: 1px solid #e2e8f0;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
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
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #56ca2f;
  margin-right: 8px;
`;

const ActiveCount = styled.div`
  margin-left: auto;
`;

export default function Space() {
  return (
    <div>
      <Title>Space</Title>
      <ItemsWrapper>
        {SPACE_ITEMS.map((item, index) => (
          <Item key={index}>
            <IconWrapper>
              <Icon>
                {item.icon && <img src={`/imgs/icons/${item.icon}`} />}
                {!item.icon && <DefaultIcon />}
              </Icon>
              <InternalLink href="/list">
                <Name>{item.name}</Name>
              </InternalLink>
              <Symbol>{item.symbol ?? "-"}</Symbol>
            </IconWrapper>
            <Divider />
            <ActiveWrapper>
              <ActiveCircle />
              Active
              <ActiveCount>{item.active ?? 0}</ActiveCount>
            </ActiveWrapper>
          </Item>
        ))}
      </ItemsWrapper>
    </div>
  );
}
