const { useMemo } = require("react");
const { StyledTitle } = require("../styled");
const { default: AccountsList } = require("./accountsList");
const { default: useExtensionAccounts } = require("./useExtensionAccounts");

export default function SubstrateAccountsView({ chain, wallet }) {
  const { accounts, loading: isAccountsLoading } = useExtensionAccounts(
    wallet?.extensionName,
  );
  const substrateAccounts = useMemo(
    () => (accounts || []).filter((account) => account.type !== "ethereum"),
    [accounts],
  );

  return (
    <>
      <StyledTitle>Select An Account</StyledTitle>
      <div className="flex justify-between items-center p-[12px] bg-fillBgTertiary">
        <div className="flex gap-[12px] items-center">
          <wallet.logo className="w-[32px] h-[32px]" />
          <label className="text14Semibold">{wallet.title}</label>
        </div>
        <span className="text12Medium text-textTertiary">
          {accounts?.length || 0} Connected
        </span>
      </div>
      {!isAccountsLoading && (
        <AccountsList chain={chain} accounts={substrateAccounts} />
      )}
    </>
  );
}
