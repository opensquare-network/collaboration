import styled, { css } from "styled-components";
import IdentityIcon from "@osn/common-ui/es/User/IdentityIcon";
import { addressEllipsis } from "../frontedUtils";

const IdentityWrapper = styled.span`
  display: inline-flex;
  align-items: start;

  > span:first-child {
    height: 24px;
  }

  > :not(:first-child) {
    margin-left: 4px;
  }

  ${(p) =>
    p.ellipsis &&
    css`
      > span:last-child {
        word-break: break-all;
      }
    `}
`;

const Name = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`;

export default function IdentityOrAddr({ identity, addr, ellipsis = false }) {
  return identity?.info && identity?.info?.status !== "NO_ID" ? (
    <IdentityWrapper ellipsis={ellipsis}>
      <IdentityIcon status={identity.info.status} showTooltip size={12} />
      <Name title={identity.info.display}>{identity.info.display}</Name>
    </IdentityWrapper>
  ) : (
    <Name>{addressEllipsis(addr)}</Name>
  );
}
