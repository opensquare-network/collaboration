import styled from "styled-components";
import { Button } from "@osn/common-ui";
import nextApi from "services/nextApi";
import { useViewfunc } from "frontedUtils/hooks";
import { extensionCancelled } from "frontedUtils/consts/extension";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
// TODO: use { createToast } from common-ui instead
import {
  newToastId,
  newErrorToast,
  newPendingToast,
  removeToast,
  newSuccessToast,
} from "store/reducers/toastSlice";
import { useState } from "react";
import { delayPromise } from "../../services/delayLoading";
import {
  loginAddressSelector,
  loginNetworkSelector,
} from "store/reducers/accountSlice";
import { isSameAddress } from "frontedUtils/address";
import { signTerminateWith } from "frontedUtils/signData";
import useSignApiData from "hooks/useSignApiData";

const StyledButton = styled(Button)`
  margin-left: 20px;
`;

export function TerminateButton({ proposal = {} }) {
  const loginAddress = useSelector(loginAddressSelector);
  const { network: loginNetwork } = useSelector(loginNetworkSelector) || {};
  const dispatch = useDispatch();
  const viewfunc = useViewfunc();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const signApiData = useSignApiData();

  const isAuthor = isSameAddress(loginAddress, proposal.address);

  const handleTerminate = async () => {
    if (!viewfunc) {
      return;
    }

    let signedData;
    setIsLoading(true);
    try {
      signedData = await signTerminateWith(signApiData, {
        address: loginAddress,
        proposalCid: proposal.cid,
        terminatorNetwork: loginNetwork,
      });
    } catch (error) {
      const errorMessage = error.message;
      if (extensionCancelled !== errorMessage) {
        dispatch(newErrorToast(errorMessage));
      }
      setIsLoading(false);
      return;
    }

    const toastId = newToastId();
    dispatch(newPendingToast(toastId, "Proposal terminating..."));
    let result;
    try {
      [result] = await delayPromise(
        nextApi.post(`${proposal?.space}/terminate`, signedData),
      );
    } finally {
      dispatch(removeToast(toastId));
      setIsLoading(false);
    }

    if (result?.error) {
      dispatch(newErrorToast(result.error.message));
    } else if (result) {
      dispatch(newSuccessToast("Proposal terminated successfully!"));
      router.replace({
        query: {
          ...router.query,
        },
      });
    }
  };

  if (!isAuthor) {
    return null;
  }

  return (
    <StyledButton isLoading={isLoading} large onClick={handleTerminate}>
      Terminate
    </StyledButton>
  );
}
