import { useConnector } from "hooks/wagmi";
import { StyledTitle } from "../styled";
import { evmWallets } from "./consts";
import WalletItem from "./walletItem";
import { useAccount, useConnect } from "wagmi";
import { useCallback } from "react";

function EvmWallet({ wallet, onConnect }) {
  const walletConnector = useConnector(wallet.connectorId);
  const { connect } = useConnect();
  const { connector: activeConnector } = useAccount();

  const onSelectWallet = useCallback(async () => {
    if (!walletConnector) {
      return;
    }
    if (activeConnector?.id === walletConnector.id) {
      onConnect();
      return;
    }
    connect({ connector: walletConnector }, { onSuccess: onConnect });
  }, [connect, onConnect, walletConnector, activeConnector]);

  const installed = !!walletConnector;

  return (
    <WalletItem
      wallet={wallet}
      loading={false}
      installed={installed}
      onClick={onSelectWallet}
    />
  );
}

export default function EvmWalletList({ onSelectWallet }) {
  return (
    <div className="flex flex-col gap-[16px]">
      <StyledTitle>Wallet</StyledTitle>
      <div className="flex flex-wrap gap-[12px]">
        {evmWallets.map((wallet) => (
          <EvmWallet
            key={wallet.extensionName}
            wallet={wallet}
            onConnect={() => onSelectWallet(wallet)}
          />
        ))}
      </div>
    </div>
  );
}
