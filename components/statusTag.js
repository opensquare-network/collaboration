import styled, { css } from "styled-components";

const Wrapper = styled.div`
  text-transform: capitalize;
  padding: 3px 12px;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  color: #ffffff;
  background: #e2e8f0;
  ${(p) =>
    p.color &&
    css`
      background: ${p.color};
    `}
`;

const getColor = (status) => {
  if (status && typeof status === "string") {
    let lower = status.toLocaleLowerCase();
    switch (lower) {
      case "pending":
        return "#04D2C5";
      case "active":
        return "#6848FF";
    }
  }
};

export default function StatusTag({ children }) {
  if (!children) return null;
  return <Wrapper color={getColor(children)}>{children}</Wrapper>;
}
