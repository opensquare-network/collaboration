import styled from "styled-components";
import Identicon from "@osn/polkadot-react-identicon";
import { ethers } from "ethers";
import makeBlockie from "ethereum-blockies-base64";

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  background: #f0f3f8; ;
`;

const ImgWrapper = styled.img`
  border-radius: ${(props) => props.size / 2}px;
`;

export default function Avatar({ address, size = 20 }) {
  if (ethers.utils.isAddress(address)) {
    const imgSize = (size / 10) * 8;

    return (
      <Wrapper size={size}>
        <ImgWrapper
          size={imgSize}
          src={makeBlockie(address)}
          width={imgSize}
          height={imgSize}
          alt={address}
        />
      </Wrapper>
    );
  }

  return <Identicon value={address} size={size} />;
}
