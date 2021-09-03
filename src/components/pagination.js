import { useState } from "react";
import styled, { css } from "styled-components";

import CaretLeft from "/public/imgs/icons/caret-left.svg";
import CaretRight from "/public/imgs/icons/caret-right.svg";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  > :not(:first-child) {
    margin-left: 8px;
  }
`;

const Nav = styled.div`
  cursor: pointer;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background: #f0f3f8;
  }
  > svg {
    fill: #a1a8b3;
  }
  ${(p) =>
    p.disabled &&
    css`
      cursor: auto;
      pointer-events: none;
      > svg {
        fill: #e3e7ed;
      }
      :hover {
        background: none;
      }
    `}
`;

const Item = styled.a`
  padding: 0 8px;
  cursor: pointer;
  min-width: 28px;
  height: 28px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  color: #a1a8b3;
  :hover {
    background: #f0f3f8;
  }
  ${(p) =>
    p.active &&
    css`
      background: #f0f3f8;
      color: #2e343d;
      cursor: auto;
      pointer-events: none;
    `}
`;

const Ellipsis = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #a1a8b3;
  & + & {
    display: none;
  }
`;

export default function Pagination() {
  const totalPages = 9;
  const [page, setPage] = useState(1);

  return (
    <Wrapper>
      <Nav disabled={page === 1}>
        <CaretLeft onClick={() => setPage(page - 1)} />
      </Nav>
      {Array.from(Array(totalPages)).map((_, index) =>
        index + 1 > 1 &&
        index + 1 < totalPages &&
        Math.abs(index + 1 - page) >= 2 ? (
          <Ellipsis key={index}>...</Ellipsis>
        ) : (
          <Item
            key={index}
            active={page === index + 1}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </Item>
        )
      )}
      <Nav disabled={page === totalPages}>
        <CaretRight onClick={() => setPage(page + 1)} />
      </Nav>
    </Wrapper>
  );
}
