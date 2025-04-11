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
import useIdentity from "hooks/useIdentity";
import useIdentities from "hooks/useIdentities";

function AccountItem({ account, chain, onClick }) {
  const { identity } = useIdentity(chain.network, account.address);
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
          <label className="text14Medium">
            {identity?.info?.display ||
              account.name ||
              addressEllipsis(address)}
          </label>
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
  const [search, setSearch] = useState("");
  const addresses = useMemo(
    () => (accounts || []).map((account) => account.address),
    [accounts],
  );
  const { identities } = useIdentities(chain.network, addresses);

  const filteredAccounts = useMemo(
    () =>
      (accounts || []).filter((account, index) => {
        if (!search) {
          return accounts;
        }
        const identity = identities?.[index];
        if (identity) {
          if (
            identity.info?.display &&
            identity.info.display.toLowerCase().includes(search.toLowerCase())
          ) {
            return true;
          }
        } else {
          if (
            account.name &&
            account.name.toLowerCase().includes(search.toLowerCase())
          ) {
            return true;
          }
        }
        const accAddr = encodeAddressByChain(account.address, chain.network);
        return accAddr.toLowerCase().includes(search.toLowerCase());
      }),
    [accounts, chain, search, identities],
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
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
