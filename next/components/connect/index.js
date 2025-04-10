import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { availableNetworksSelector } from "store/reducers/accountSlice";

import AccountSelector from "../accountSelector";

import styled from "styled-components";
import ChainSelector from "@/components/chainSelector";
import {
  ActionBar,
  StyledText,
  StyledTitle,
} from "@/components/connect/styled";
import NoAccount from "@/components/connect/noAccount";
import Closeable from "@/components/connect/closeable";
import { evmChains } from "../../frontedUtils/consts/chains";
import ConnectButton from "@/components/connect/connectButton";
import { MetamaskElement } from "@/components/connect/metamask";
import SubstrateWalletList from "./wallets/substrateWallets";
import useExtensionAccounts from "./wallets/useExtensionAccounts";

const Wrapper = styled.div``;

function WalletAccount({ chain, isEvmChain, accounts }) {
  const [address, setAddress] = useState();

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setAddress(accounts[0].address);
    }
  }, [accounts]);

  if (isEvmChain) {
    return <MetamaskElement network={chain.network} />;
  }

  if (accounts.length <= 0) {
    return <NoAccount />;
  }

  return (
    <div className="flex flex-col gap-[16px]">
      <StyledText>Account</StyledText>
      <AccountSelector
        accounts={accounts}
        onSelect={(account) => {
          setAddress(account?.address);
        }}
        chain={chain}
      />

      <ActionBar>
        <ConnectButton address={address} network={chain.network} />
      </ActionBar>
    </div>
  );
}

function SelectWalletView({ setChain, setWallet }) {
  const availableNetworks = useSelector(availableNetworksSelector);

  const [metaMaskNetworkChangeCount, setMetaMaskNetworkChangeCount] =
    useState(1);

  useEffect(() => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      return;
    }
    window.ethereum.on("chainChanged", () => {
      setMetaMaskNetworkChangeCount(metaMaskNetworkChangeCount + 1);
    });
  }, [metaMaskNetworkChangeCount]);

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

  const [metaMaskNetworkChangeCount, setMetaMaskNetworkChangeCount] =
    useState(1);

  useEffect(() => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      return;
    }
    window.ethereum.on("chainChanged", () => {
      setMetaMaskNetworkChangeCount(metaMaskNetworkChangeCount + 1);
    });
  }, [metaMaskNetworkChangeCount]);

  const isEvmChain = evmChains.includes(chain?.network);

  const Logo = wallet.logo;

  return (
    <>
      <StyledTitle>Select An Account</StyledTitle>
      <div className="flex justify-between items-center p-[12px] bg-fillBgTertiary">
        <div className="flex gap-[12px] items-center">
          <Logo className="w-[32px] h-[32px]" />
          <label className="text14Semibold">{wallet.title}</label>
        </div>
        <span className="text12Medium text-textTertiary">6 Connected</span>
      </div>

      {!isAccountsLoading && (
        <WalletAccount
          chain={chain}
          isEvmChain={isEvmChain}
          accounts={accounts}
        />
      )}
    </>
  );
}

export default function Connect({ networks }) {
  const [chain, setChain] = useState(networks[0]);
  const [wallet, setWallet] = useState();

  return (
    <Wrapper>
      <Closeable open={true}>
        <div className="flex flex-col gap-[20px]">
          {wallet ? (
            <SelectAccountView chain={chain} wallet={wallet} />
          ) : (
            <SelectWalletView setChain={setChain} setWallet={setWallet} />
          )}
        </div>
      </Closeable>
    </Wrapper>
  );
}
