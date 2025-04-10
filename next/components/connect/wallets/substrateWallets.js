import { cn } from "@osn/common-ui";
import { StyledTitle } from "../styled";
import { substrateWallets } from "./consts";
import useInjectedExtension from "./useInjectedExtension";
import WalletTypes from "./walletTypes";

function SubstrateWallet({ wallet, onClick }) {
  const extensionName =
    wallet.extensionName === WalletTypes.NOVA
      ? WalletTypes.POLKADOT_JS
      : wallet.extensionName;

  const { loading, injectedExtension } = useInjectedExtension(extensionName);

  const installed =
    !loading &&
    !!injectedExtension &&
    (wallet.extensionName !== WalletTypes.NOVA ||
      injectedExtension?.isNovaWallet);

  const Logo = wallet.logo;
  return (
    <div
      className={cn(
        installed ? "cursor-pointer" : "pointer-events-none",
        !installed && "bg-fillBgTertiary",
        "flex flex-col justify-center items-center gap-[12px] w-[136px] h-[96px]",
        "border border-strokeActionDefault",
        installed && "hover:border-strokeActionActive",
      )}
      onClick={onClick}
    >
      <Logo className="w-[32px] h-[32px]" />
      {installed ? (
        <label className="text14Semibold">{wallet.title}</label>
      ) : (
        <div className="flex gap-[4px] text-textTertiary">
          <label className="text14Semibold">{wallet.title}</label>
          <div className="textBrandSecondary">D</div>
        </div>
      )}
    </div>
  );
}

export default function SubstrateWalletList({ onSelectWallet }) {
  return (
    <div className="flex flex-col">
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
