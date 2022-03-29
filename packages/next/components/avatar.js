import styled from "styled-components";
import Identicon from "@osn/polkadot-react-identicon";
import { ethers } from "ethers";
import makeBlockie from "ethereum-blockies-base64";

const ImgWrapper = styled.img`
  border-radius: ${(props) => props.size / 2}px;
`;

export default function Avatar({ address, size = 24 }) {
  if (ethers.utils.isAddress(address)) {
    return (
      <ImgWrapper
        size={size}
        src={makeBlockie(address)}
        width={size}
        height={size}
        alt={address}
      />
    );
  }

  return <Identicon value={address} size={size} />;
}
