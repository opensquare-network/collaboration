import { useState } from "react";
import { useSelector } from "react-redux";
import { availableNetworksSelector } from "store/reducers/accountSlice";
import ChainSelector from "@/components/chainSelector";
import { StyledTitle } from "@/components/connect/styled";
import Closeable from "@/components/connect/closeable";
import SubstrateWalletList from "./wallets/substrateWallets";
import useExtensionAccounts from "./wallets/useExtensionAccounts";
import AccountsList from "./wallets/accountsList";

function SelectWalletView({ setChain, setWallet }) {
  const availableNetworks = useSelector(availableNetworksSelector);

  return (
    <>
      <StyledTitle>Connect Wallet</StyledTitle>
      <ChainSelector
        chains={availableNetworks}
        onSelect={(chain) => setChain(chain)}
      />
      <SubstrateWalletList onSelectWallet={setWallet} />
    </>
  );
}

function SelectAccountView({ chain, wallet }) {
  const { accounts, loading: isAccountsLoading } = useExtensionAccounts(
    wallet?.extensionName,
  );

  const Logo = wallet.logo;

  return (
    <>
      <StyledTitle>Select An Account</StyledTitle>
      <div className="flex justify-between items-center p-[12px] bg-fillBgTertiary">
        <div className="flex gap-[12px] items-center">
          <Logo className="w-[32px] h-[32px]" />
          <label className="text14Semibold">{wallet.title}</label>
        </div>
        <span className="text12Medium text-textTertiary">
          {accounts?.length || 0} Connected
        </span>
      </div>
      {!isAccountsLoading && <AccountsList chain={chain} accounts={accounts} />}
    </>
  );
}

export default function Connect({ networks }) {
  const [chain, setChain] = useState(networks[0]);
  const [wallet, setWallet] = useState();

  return (
    <Closeable>
      <div className="flex flex-col gap-[20px]">
        {wallet ? (
          <SelectAccountView chain={chain} wallet={wallet} />
        ) : (
          <SelectWalletView setChain={setChain} setWallet={setWallet} />
        )}
      </div>
    </Closeable>
  );
}
