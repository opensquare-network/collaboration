import styled from "styled-components";
import { Button } from "@osn/common-ui";
import nextApi from "services/nextApi";

const TerminateButton = styled(Button)`
  margin-left: 20px;
`;

export function useTerminate({ loginAddress, proposal = {} }) {
  const isAuthor = loginAddress === proposal.address;

  // TODO: double check terminate
  const handleTerminate = () => {
    nextApi;
  };
  let terminateButton = null;

  if (isAuthor) {
    terminateButton = (
      <TerminateButton large onClick={handleTerminate}>
        Terminate
      </TerminateButton>
    );
  }

  return {
    terminateButton,
  };
}
