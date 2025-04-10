import { StyledTitle } from "../styled";
import { substrateWallets } from "./consts";
import useInjectedExtension from "./useInjectedExtension";
import WalletTypes from "./walletTypes";
import WalletItem from "./walletItem";

function getExtensionName(wallet) {
  if (wallet.extensionName === WalletTypes.NOVA) {
    return WalletTypes.POLKADOT_JS;
  }
  return wallet.extensionName;
}

function SubstrateWallet({ wallet, onClick }) {
  const extensionName = getExtensionName(wallet);
  const { loading, injectedExtension } = useInjectedExtension(extensionName);

  const installed =
    injectedExtension &&
    (wallet.extensionName !== WalletTypes.NOVA ||
      injectedExtension?.isNovaWallet);

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
            onClick={() => onSelectWallet(wallet)}
          />
        ))}
      </div>
    </div>
  );
}
