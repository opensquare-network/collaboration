import styled, { css } from "styled-components";
import { Fragment } from "react";

import InternalLink from "./internalLink";
import CaretLeft from "/public/imgs/icons/caret-left.svg";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

const ItemsWrapper = styled.div`
  display: flex;
`;

const Item = styled.div`
  display: flex;
  text-transform: capitalize;

  ${(p) =>
    p.active &&
    css`
      :hover {
        text-decoration: underline;
      }
    `}

  ${(p) =>
    !p.active &&
    css`
      color: #a1a8b3;
    `}
`;

const Divider = styled.div`
  margin: 0 8px;
  color: #a1a8b3;
`;

const BackButton = styled.div`
  width: 36px;
  height: 36px;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  border-radius: 50%;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  > svg {
    fill: #506176;
  }
  :hover {
    > svg {
      fill: #1e2134;
    }
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
          <Fragment key={index}>
            <Item active={item.link}>
              <InternalLink href={item.link}>{item.name}</InternalLink>
            </Item>
            {index + 1 !== data?.length && <Divider>/</Divider>}
          </Fragment>
        ))}
      </ItemsWrapper>
    </Wrapper>
  );
}
