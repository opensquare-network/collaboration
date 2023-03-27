import styled from "styled-components";
import Tooltip from "../tooltip";
import { ReactComponent as JoinedSVG } from "./joined.svg";
import { ReactComponent as NotJoinedSVG } from "./not-joined.svg";

const NotJoinedMark = styled(NotJoinedSVG)`
  &:hover {
    path {
      fill: #B7C0CC;
    }
  }
`;

const JoinedMark = styled(JoinedSVG)``;


export default function JoinButton({ joined, onClick = ()=>{} }) {
  if (!joined) {
    return (
      <Tooltip content={"Join space"}>
        <NotJoinedMark onClick={onClick} />
      </Tooltip>
    );
  }

  return (
    <Tooltip content={"Leave space"}>
      <JoinedMark onClick={onClick} />
    </Tooltip>
  );
}
