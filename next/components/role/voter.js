import styled from "styled-components";
import Popup from "@/components/popup";
import { IdentityUser } from "@osn/common-ui";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: var(--textPrimary);

  > :not(:first-child) {
    margin-left: 4px;
  }
`;

const TextMinor = styled.span`
  color: var(--textSecondary);
  word-break: break-all;
`;

const PopupCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 288px;
  color: var(--textPrimary);
  > div:first-child {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const Divider = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  height: 1px;
  width: 100%;
  background-color: var(--fillBgTertiary);
`;

export default function Voter({
  address,
  network,
  showNetwork = true,
  // eslint-disable-next-line
  isSafari = false,
}) {
  const popup = (
    <PopupCard>
      <IdentityUser
        address={address}
        network={network}
        networkIconSize={showNetwork ? 16 : 0}
      />
      <Divider />
      <TextMinor>{address}</TextMinor>
    </PopupCard>
  );

  return (
    <Wrapper>
      <Popup content={popup}>
        <IdentityUser
          address={address}
          network={network}
          networkIconSize={showNetwork ? 16 : 0}
        />
      </Popup>
    </Wrapper>
  );
}
