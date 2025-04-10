import { useState } from "react";
import { useSelector } from "react-redux";
import { availableNetworksSelector } from "store/reducers/accountSlice";
import ChainSelector from "@/components/chainSelector";
import { StyledTitle } from "@/components/connect/styled";
import Closeable from "@/components/connect/closeable";
import SubstrateWalletList from "./wallets/substrateWallets";
import { evmChains } from "../../frontedUtils/consts/chains";
import EvmWalletList from "./wallets/evmWalletList";
import SubstrateAccountsView from "./wallets/substrateAccountsView";

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

  return (
    <Closeable>
      <div className="flex flex-col gap-[20px]">
        {wallet ? (
          <SubstrateAccountsView chain={chain} wallet={wallet} />
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
