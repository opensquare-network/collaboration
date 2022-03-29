import NoMetamask from "@/components/connect/noMetamask";
import { ActionBar } from "@/components/connect/styled";
import ConnectButton from "@/components/connect/connectButton";
import { evmChainId } from "../../frontedUtils/consts/chains";
import WrongNetwork from "@/components/connect/wrongNetwork";
import MetamaskNoAccount from "@/components/connect/metamask/noAccount";
import { setAccount } from "../../store/reducers/accountSlice";
import { closeConnect } from "../../store/reducers/showConnectSlice";

export async function getMetamaskElement(network, dispatch, hookFn = () => {}) {
  if (!window.ethereum || !window.ethereum.isMetaMask) {
    return <NoMetamask />;
  }

  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  if (parseInt(chainId) !== evmChainId[network]) {
    return <WrongNetwork network={network} />;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  if ((accounts || []).length <= 0) {
    return <MetamaskNoAccount />;
  }

  console.log("accounts", accounts);

  const doConnect = async () => {
    try {
      dispatch(
        setAccount({
          address: accounts[0],
          network: network,
        })
      );
      dispatch(closeConnect());
      hookFn();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ActionBar>
      <ConnectButton doConnect={doConnect} isMetamask={true} />
    </ActionBar>
  );
}
