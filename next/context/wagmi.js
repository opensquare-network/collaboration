import { WagmiProvider as Provider } from "wagmi";
import { createConfig } from "wagmi";
import { coinbaseWallet, injected } from "wagmi/connectors";
import { http } from "wagmi";
import { mainnet } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [mainnet],
  ssr: true,
  connectors: [
    injected(),
    coinbaseWallet({
      appName: "opensquare.io",
    }),
  ],
  transports: {
    [mainnet.id]: http(),
  },
});

export default function WagmiProvider({ children }) {
  return <Provider config={wagmiConfig}>{children}</Provider>;
}
