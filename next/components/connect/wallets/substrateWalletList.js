import { StyledTitle } from "../styled";
import { substrateWallets } from "./consts";
import useInjectedExtension from "./useInjectedExtension";
import WalletTypes from "./walletTypes";
import WalletItem from "./walletItem";
import { useCallback } from "react";
import { appName } from "frontedUtils/consts/app";

function getExtensionName(wallet) {
  if (wallet.extensionName === WalletTypes.NOVA) {
    return WalletTypes.POLKADOT_JS;
  }
  return wallet.extensionName;
}

function SubstrateWallet({ wallet, onConnect }) {
  const extensionName = getExtensionName(wallet);
  const { loading, injectedExtension } = useInjectedExtension(extensionName);

  const installed =
    injectedExtension &&
    (wallet.extensionName !== WalletTypes.NOVA ||
      injectedExtension?.isNovaWallet);

  const onClick = useCallback(async () => {
    if (!injectedExtension) {
      return;
    }
    try {
      const injected = await injectedExtension.enable(appName);
      await injected.accounts.get();
      onConnect();
    } catch (e) {
      return;
    }
  }, [injectedExtension, onConnect]);

  return (
    <WalletItem
      wallet={wallet}
      loading={loading}
      installed={installed}
      onClick={onClick}
    />
  );
}

export default function SubstrateWalletList({ onSelectWallet }) {
  return (
    <div className="flex flex-col gap-[16px]">
      <StyledTitle>Wallet</StyledTitle>
      <div className="flex flex-wrap gap-[12px]">
        {substrateWallets.map((wallet) => (
          <SubstrateWallet
            key={wallet.extensionName}
            wallet={wallet}
            onConnect={() => onSelectWallet(wallet)}
          />
        ))}
      </div>
    </div>
  );
}
