import styled from "styled-components";
import Popup from "@/components/popup";
import { IdentityUser } from "@osn/common-ui";
import makeBlockie from "ethereum-blockies-base64";
import { networks } from "frontedUtils/consts/chains/networks";

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

function AnonymousVoter() {
  return (
    <div className="flex gap-2 items-center">
      <img
        className="rounded-full w-[20px] h-[20px]"
        src={makeBlockie("0x1111111111111111111111111111111111111111")}
      />
      <span>Anonymous</span>
    </div>
  );
}

export default function Voter({
  address,
  network,
  showNetwork = true,
  // eslint-disable-next-line
  isSafari = false,
}) {
  let normalizeNetwork = network;
  if (network === networks.astarEvm) {
    normalizeNetwork = networks.astar;
  }

  const popup = (
    <PopupCard>
      <IdentityUser
        address={address}
        network={normalizeNetwork}
        networkIconSize={showNetwork ? 16 : 0}
      />
      <Divider />
      <TextMinor>{address}</TextMinor>
    </PopupCard>
  );

  return (
    <Wrapper>
      {address ? (
        <Popup content={popup}>
          <IdentityUser
            address={address}
            network={normalizeNetwork}
            networkIconSize={showNetwork ? 16 : 0}
          />
        </Popup>
      ) : (
        <AnonymousVoter />
      )}
    </Wrapper>
  );
}
