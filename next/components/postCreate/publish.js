import { memo, useMemo } from "react";
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
import WhitelistMemberButton from "../whitelistMemberButton";
import { isCollectiveSpace } from "frontedUtils/space";

function BalanceThresholdButton({
  children,
  threshold,
  isLoading,
  disabled,
  ...props
}) {
  const balanceLoading = useSelector(balanceLoadingSelector);
  const balance = useSelector(targetBalanceSelector);
  const belowThreshold = new BigNumber(balance).isLessThan(threshold);

  return (
    <Button
      isLoading={isLoading || balanceLoading}
      disabled={disabled || belowThreshold}
      {...props}
    >
      {children}
    </Button>
  );
}

function Publish({ onPublish, space }) {
  const dispatch = useDispatch();
  const useProxy = useSelector(useProxySelector);
  const loginAddress = useSelector(loginAddressSelector);
  const createProposalLoading = useSelector(createProposalLoadingSelector);
  const isSocietySpace = space.accessibility === "society";
  const isWhitelistSpace = space.accessibility === "whitelist";
  const whitelist = useMemo(() => {
    if (!space) return null;
    if (isCollectiveSpace(space.type)) {
      return space.members;
    }
    return space.whitelist;
  }, [space]);

  if (!loginAddress) {
    return (
      <Button large primary block onClick={() => dispatch(popUpConnect())}>
        Connect Wallet
      </Button>
    );
  }

  const buttonText = useProxy ? "Proxy Publish" : "Publish";

  if (isSocietySpace) {
    return (
      <SocietyMemberButton
        block
        large
        primary
        onClick={onPublish}
        isLoading={createProposalLoading}
      >
        {buttonText}
      </SocietyMemberButton>
    );
  }

  if (isWhitelistSpace) {
    return (
      <WhitelistMemberButton
        block
        large
        primary
        onClick={onPublish}
        isLoading={createProposalLoading}
        whitelist={whitelist}
      >
        {buttonText}
      </WhitelistMemberButton>
    );
  }

  return (
    <BalanceThresholdButton
      block
      large
      primary
      onClick={onPublish}
      isLoading={createProposalLoading}
      threshold={space?.proposeThreshold}
    >
      {buttonText}
    </BalanceThresholdButton>
  );
}

export default memo(Publish);
