import styled from "styled-components";
import { Button } from "@osn/common-ui";
import nextApi from "services/nextApi";
import { useViewfunc } from "frontedUtils/hooks";
import { extensionCancelled } from "frontedUtils/consts/extension";
import { useDispatch } from "react-redux";
// TODO: use { createToast } from common-ui instead
import {
  newToastId,
  newErrorToast,
  newPendingToast,
  removeToast,
} from "store/reducers/toastSlice";

const TerminateButton = styled(Button)`
  margin-left: 20px;
`;

export function useTerminate({ loginAddress, loginNetwork, proposal = {} }) {
  const dispatch = useDispatch();
  const viewfunc = useViewfunc();

  const isAuthor = loginAddress === proposal.address;

  // TODO: double check terminate
  const handleTerminate = async () => {
    if (!viewfunc) {
      return;
    }
    let signedData;
    try {
      signedData = await viewfunc.signTerminate({
        address: loginAddress,
        proposalCid: proposal.cid,
        terminatorNetwork: loginNetwork,
      });
    } catch (error) {
      const errorMessage = error.message;
      if (extensionCancelled === errorMessage) {
      } else {
        dispatch(newErrorToast(errorMessage));
      }
      return;
    }

    const toastId = newToastId();
    dispatch(newPendingToast(toastId, "Teminating proposal..."));
    let result;
    try {
      result = await nextApi.post(`${proposal?.space}/terminate`, signedData);
    } finally {
      dispatch(removeToast(toastId));
    }

    if (result?.error) {
      dispatch(newErrorToast(result.error.message));
    }
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
