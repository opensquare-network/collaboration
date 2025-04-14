import { useState } from "react";
import { useSelector } from "react-redux";
import { availableNetworksSelector } from "store/reducers/accountSlice";
import ChainSelector from "@/components/chainSelector";
import { StyledTitle } from "@/components/connect/styled";
import Closeable from "@/components/connect/closeable";
import { evmChains } from "frontedUtils/consts/chains";
import SubstrateAccountsView from "./wallets/substrateAccountsView";
import SubstrateWalletList from "./wallets/substrateWalletList";
import EvmAccountsView from "./wallets/evmAccountsView";
import EvmWalletList from "./wallets/evmWalletList";

function SelectWalletView({ chain, setChain, setWallet }) {
  const availableNetworks = useSelector(availableNetworksSelector);
  const isEvmChain = evmChains.includes(chain.network);

  return (
    <>
      <StyledTitle>Connect Wallet</StyledTitle>
      <ChainSelector
        chains={availableNetworks}
        onSelect={(chain) => setChain(chain)}
      />
      {isEvmChain ? (
        <EvmWalletList onSelectWallet={setWallet} />
      ) : (
        <SubstrateWalletList onSelectWallet={setWallet} />
      )}
    </>
  );
}

export default function Connect({ networks }) {
  const [chain, setChain] = useState(networks[0]);
  const [wallet, setWallet] = useState();
  const isEvmChain = evmChains.includes(chain.network);

  return (
    <Closeable>
      <div className="flex flex-col gap-[20px]">
        {wallet ? (
          isEvmChain ? (
            <EvmAccountsView chain={chain} wallet={wallet} />
          ) : (
            <SubstrateAccountsView chain={chain} wallet={wallet} />
          )
        ) : (
          <SelectWalletView
            chain={chain}
            setChain={setChain}
            setWallet={setWallet}
          />
        )}
      </div>
    </Closeable>
  );
}
