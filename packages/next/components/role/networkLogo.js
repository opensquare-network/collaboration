import styled from "styled-components";
import { makeSquare } from "../../styles/globalCss";

const LogoImg = styled.img`
  ${makeSquare(16)};
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  margin-right: 4px;
`;


export default function NetworkLogo({ network }){
  return <LogoImg src={ `/imgs/icons/space-chain/${ network }.svg` } alt="" />
}
