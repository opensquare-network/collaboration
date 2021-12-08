import styled from "styled-components";

import AuthIcon from "public/imgs/icons/identity/auth.svg";
import SubIcon from "public/imgs/icons/identity/sub.svg";
import ErrorIcon from "public/imgs/icons/identity/error.svg";
import UnauthorizedIcon from "public/imgs/icons/identity/error-grey.svg";
import SubGreyIcon from "public/imgs/icons/identity/sub-grey.svg";
import SubRedIcon from "public/imgs/icons/identity/sub-red.svg";
import Tooltip from "./tooltip";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export default function IdentityIcon({
  status,
  position,
  offset,
  showTooltip = false,
}) {
  const statusIconMap = new Map([
    ["NOT_VERIFIED", { icon: UnauthorizedIcon, desc: "Identity not verified" }],
    ["VERIFIED", { icon: AuthIcon, desc: "Identity verified" }],
    ["ERRONEOUS", { icon: ErrorIcon, desc: "Erroneous identity" }],
    ["VERIFIED_LINKED", { icon: SubIcon, desc: "Sub account of verified" }],
    [
      "NOT_VERIFIED_LINKED",
      { icon: SubGreyIcon, desc: "Sub account of unverified" },
    ],
    [
      "ERRONEOUS_LINKED",
      { icon: SubRedIcon, desc: "Sub account of erroneous identity" },
    ],
  ]);

  const StatusIcon = statusIconMap.get(status)?.icon ?? ErrorIcon;
  const statusDesc = statusIconMap.get(status)?.desc ?? "Erroneous identity";

  return (
    <Wrapper>
      <StatusIcon />
      {showTooltip && (
        <Tooltip
          content={statusDesc}
          position={position}
          offset={offset}
          size="full"
        >
          <div />
        </Tooltip>
      )}
    </Wrapper>
  );
}
