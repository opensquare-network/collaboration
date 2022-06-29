import Avatar from "@/components/avatar";
import styled from "styled-components";
import { ChainIcon } from "@osn/common-ui";
import Popup from "@/components/popup";
import IdentityOrAddr from "@/components/identityOrAddr";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: #2e343d;

  > :not(:first-child) {
    margin-left: 4px;
  }
  .ui--IdentityIcon {
    margin-top: 2px;
    svg:first-child {
      margin-right: 4px;
    }
  }
`;

const TextMinor = styled.span`
  color: #506176;
  word-break: break-all;
`;

const PopupCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 288px;
  color: #1e2134;
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
  background-color: #f0f3f8;
`;

export default function Voter({
  address,
  network,
  showNetwork = true,
  isSafari = false,
}) {
  const popup = (
    <PopupCard>
      <div>
        <Avatar address={address} size={20} />
        <ChainIcon chainName={network} size={16} />
        <IdentityOrAddr address={address} network={network} />
      </div>
      <Divider />
      <TextMinor>{address}</TextMinor>
    </PopupCard>
  );

  return (
    <Wrapper>
      <Avatar address={address} size={20} />
      {showNetwork && <ChainIcon chainName={network} size={16} />}
      <Popup content={popup}>
        <IdentityOrAddr
          address={address}
          network={network}
          isSafari={isSafari}
          ellipsis
        />
      </Popup>
    </Wrapper>
  );
}
