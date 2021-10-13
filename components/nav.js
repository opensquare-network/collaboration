import styled, { css } from "styled-components";

import InternalLink from "./internalLink";
import CaretLeft from "/public/imgs/icons/caret-left.svg";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`;

const ItemsWrapper = styled.div`
  display: flex;
`;

const Item = styled.div`
  display: flex;
  text-transform: capitalize;
  :not(:first-child)::before {
    content: "/";
    margin: 0 8px;
    color: #e3e7ed;
  }
  :hover {
    color: #04d2c5;
  }
  ${(p) =>
    !p.active &&
    css`
      color: #a1a8b3;
      :hover {
        color: #a1a8b3;
      }
    `}
`;

const BackButton = styled.div`
  width: 36px;
  height: 36px;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  border-radius: 50%;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  > svg {
    fill: #a1a8b3;
  }
`;

export default function Nav({ data }) {
  const back = data.find((item) => item.back);

  return (
    <Wrapper>
      {back && (
        <InternalLink href={back.link}>
          <BackButton>
            <CaretLeft />
          </BackButton>
        </InternalLink>
      )}
      <ItemsWrapper>
        {data.map((item, index) => (
          <Item key={index} active={item.link}>
            <InternalLink href={item.link}>{item.name}</InternalLink>
          </Item>
        ))}
      </ItemsWrapper>
    </Wrapper>
  );
}
