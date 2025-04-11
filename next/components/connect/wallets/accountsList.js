import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Avatar, cn, Input } from "@osn/common-ui";
import { addressEllipsis } from "@osn/common";
import { ArrowCaretRight, SystemSearch } from "@osn/icons/opensquare";
import { setAccount } from "store/reducers/accountSlice";
import {
  closeConnect,
  setShowHeaderMenu,
} from "store/reducers/showConnectSlice";
import NoAccount from "../noAccount";
import { StyledTitle } from "../styled";
import encodeAddressByChain from "frontedUtils/chain/addr";

function AccountItem({ account, chain, onClick }) {
  const address = encodeAddressByChain(account.address, chain.network);
  return (
    <div
      className={cn(
        "flex gap-[12px] p-[12px] items-center justify-between cursor-pointer",
        "border border-strokeActionDefault hover:border-strokeActionActive",
      )}
      onClick={onClick}
    >
      <div className="flex gap-[12px] items-center overflow-hidden">
        <Avatar address={address} size={32} />
        <div className="flex flex-col overflow-hidden">
          <label className="text14Medium">{addressEllipsis(address)}</label>
          <div className="text12Medium text-textTertiary truncate">
            {address}
          </div>
        </div>
      </div>
      <ArrowCaretRight className="w-[24px] h-[24px] [&_path]:fill-textSecondary" />
    </div>
  );
}

export default function AccountsList({ chain, accounts }) {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");

  const filteredAccounts = useMemo(
    () =>
      (accounts || []).filter((account) => {
        return address
          ? encodeAddressByChain(account.address, chain.network)
              .toLowerCase()
              .includes(address.toLowerCase())
          : accounts;
      }),
    [accounts, chain, address],
  );

  const onSelectAccount = useCallback(
    (account) => {
      dispatch(
        setAccount({
          address: account.address,
          network: chain.network,
        }),
      );
      dispatch(closeConnect());
      dispatch(setShowHeaderMenu(false));
    },
    [dispatch, chain],
  );

  if (accounts.length <= 0) {
    return <NoAccount />;
  }

  return (
    <div className="flex flex-col gap-[16px]">
      <StyledTitle>Accounts</StyledTitle>
      <Input
        placeholder="Search by name or address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        suffix={
          <SystemSearch className="w-[20px] h-[20px] [&_path]:fill-textTertiary" />
        }
      />

      <div className="flex flex-col gap-[12px] max-h-[264px] overflow-y-auto scrollbar-none">
        {(filteredAccounts || []).map((account) => (
          <AccountItem
            key={account.address}
            account={account}
            chain={chain}
            onClick={() => onSelectAccount(account)}
          />
        ))}
      </div>
    </div>
  );
}
