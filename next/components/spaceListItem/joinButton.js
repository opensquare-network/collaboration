import styled from "styled-components";
import Tooltip from "../tooltip";
import JoinedSVG from "./joined.svg";
import NotJoinedSVG from "./not-joined.svg";

const NotJoinedMark = styled(NotJoinedSVG)`
  &:hover {
    path {
      fill: #b7c0cc;
    }
  }
`;

const JoinedMark = styled(JoinedSVG)``;

export default function JoinButton({ joined, onClick = () => {} }) {
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
