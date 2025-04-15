import { cn } from "@osn/common-ui";
import { SystemDownload, SystemLoading1 } from "@osn/icons/opensquare";

export default function WalletItem({ loading, installed, onClick, wallet }) {
  return (
    <div
      className={cn(
        installed ? "cursor-pointer" : "bg-fillBgTertiary",
        "flex flex-col justify-center items-center gap-[12px] w-[136px] h-[96px]",
        "border border-strokeActionDefault",
        installed && "hover:border-strokeActionActive",
      )}
      onClick={installed ? onClick : undefined}
    >
      <wallet.logo className="w-[32px] h-[32px]" />
      {loading ? (
        <div className="flex gap-[4px] text-textTertiary">
          <label className="text14Semibold">{wallet.title}</label>
          <SystemLoading1 className="w-[16px] h-[16px] [&_path]:fill-textTertiary" />
        </div>
      ) : installed ? (
        <label className="text14Semibold">{wallet.title}</label>
      ) : (
        <div className="flex gap-[4px] text-textTertiary">
          <label className="text14Semibold">{wallet.title}</label>
          <a href={`${wallet.installUrl}`} target="_blank" rel="noreferrer">
            <SystemDownload className="w-[16px] h-[16px] [&_path]:fill-textBrandSecondary" />
          </a>
        </div>
      )}
    </div>
  );
}
