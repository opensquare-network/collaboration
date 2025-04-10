import { StyledTitle } from "../styled";
import { evmWallets } from "./consts";
import WalletItem from "./walletItem";

function EvmWallet({ wallet, onClick }) {
  return (
    <WalletItem
      wallet={wallet}
      loading={false}
      installed={false}
      onClick={onClick}
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
            onClick={() => onSelectWallet(wallet)}
          />
        ))}
      </div>
    </div>
  );
}
