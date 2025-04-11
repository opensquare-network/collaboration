import { StyledTitle } from "@/components/connect/styled";
import { MetamaskAccountList } from "./metamask";
import { useAccount } from "wagmi";

export default function EvmAccountsView({ chain, wallet }) {
  const { addresses, isConnected } = useAccount();

  return (
    <>
      <StyledTitle>Select An Account</StyledTitle>
      <div className="flex justify-between items-center p-[12px] bg-fillBgTertiary">
        <div className="flex gap-[12px] items-center">
          <wallet.logo className="w-[32px] h-[32px]" />
          <label className="text14Semibold">{wallet.title}</label>
        </div>
        <span className="text12Medium text-textTertiary">
          {addresses?.length || 0} Connected
        </span>
      </div>
      {isConnected && (
        <MetamaskAccountList chain={chain} accounts={addresses} />
      )}
    </>
  );
}
