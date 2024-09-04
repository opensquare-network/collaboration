import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAddressSelector,
  targetBalanceSelector,
  useProxySelector,
} from "../../store/reducers/accountSlice";
import { Button } from "@osn/common-ui";
import { popUpConnect } from "../../store/reducers/showConnectSlice";
import {
  balanceLoadingSelector,
  createProposalLoadingSelector,
} from "../../store/reducers/statusSlice";
import BigNumber from "bignumber.js";
import SocietyMemberButton from "../societyMemberButton";

function Publish({ threshold, onPublish, space }) {
  const dispatch = useDispatch();
  const useProxy = useSelector(useProxySelector);
  const loginAddress = useSelector(loginAddressSelector);
  const balanceLoading = useSelector(balanceLoadingSelector);
  const balance = useSelector(targetBalanceSelector);
  const belowThreshold = new BigNumber(balance).isLessThan(threshold);
  const createProposalLoading = useSelector(createProposalLoadingSelector);
  const isSocietySpace = space.accessibility === "society";

  if (!loginAddress) {
    return (
      <Button large primary block onClick={() => dispatch(popUpConnect())}>
        Connect Wallet
      </Button>
    );
  }

  const PublishButton = isSocietySpace ? SocietyMemberButton : Button;

  return (
    <PublishButton
      block
      large
      primary
      onClick={onPublish}
      isLoading={balanceLoading || createProposalLoading}
      disabled={belowThreshold}
    >
      {useProxy ? "Proxy Publish" : "Publish"}
    </PublishButton>
  );
}

export default memo(Publish);
