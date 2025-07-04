import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

const CollapsedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  ${(p) =>
    p.$collapsed &&
    css`
      overflow: hidden;
    `}
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0px;
  right: 0px;
  left: 0px;
  padding: 64px 24px 16px 24px;
  ${(p) =>
    p.$collapsed
      ? css`
          background: linear-gradient(
            180deg,
            var(--fillBgPrimary0),
            var(--fillBgPrimary80),
            var(--fillBgPrimary100)
          );
        `
      : css`
          padding-top: 16px;
          padding-bottom: 0;
          position: static;
        `}
`;

const Button = styled.button`
  padding: 6px 12px;
  border: 1px solid var(--strokeActionDefault);
  background: var(--fillBgPrimary);
  color: var(--textPrimary);
  text-align: center;

  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
`;

export default function ToggleCollapsed({ children, collapsedHeight = 640 }) {
  const [collapsed, setCollapsed] = useState(true);
  const ref = useRef(null);
  const [showToggleButton, setShowToggleButton] = useState(false);

  useEffect(() => {
    const shouldCollapse = ref.current?.clientHeight >= collapsedHeight;
    setCollapsed(shouldCollapse);
    setShowToggleButton(shouldCollapse);
  }, [ref, collapsedHeight]);

  return (
    <CollapsedWrapper
      $collapsed={collapsed}
      ref={ref}
      style={{
        maxHeight: collapsed ? collapsedHeight : "none",
      }}
    >
      {children}
      {showToggleButton && (
        <ButtonWrapper $collapsed={collapsed}>
          <Button
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          >
            Show {collapsed ? "More" : "Less"}
          </Button>
        </ButtonWrapper>
      )}
    </CollapsedWrapper>
  );
}
