import { WagmiProvider as Provider } from "wagmi";
import { createConfig } from "wagmi";
import { coinbaseWallet, injected } from "wagmi/connectors";
import { http } from "wagmi";
import { mainnet, creditCoin3Mainnet } from "wagmi/chains";
import { appName } from "frontedUtils/consts/app";

export const wagmiConfig = createConfig({
  chains: [mainnet, creditCoin3Mainnet],
  ssr: true,
  connectors: [
    injected(),
    coinbaseWallet({
      appName,
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [creditCoin3Mainnet.id]: http(),
  },
});

export default function WagmiProvider({ children }) {
  return <Provider config={wagmiConfig}>{children}</Provider>;
}
