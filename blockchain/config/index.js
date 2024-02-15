import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage, http } from "wagmi";
import { mainnet, sepolia, bscTestnet } from "wagmi/chains";

// Get projectId at https://cloud.walletconnect.com
//export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
export const projectId = "cba982b7f4ad2e5858d3ed2f2b4a3ac2";

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
export const config = defaultWagmiConfig({
  chains: [mainnet, sepolia, bscTestnet], // required
  projectId, // required
  metadata, // required
  ssr: true,
  /*transports: {
    [mainnet.id]: http("https://eth-mainnet.g.alchemy.com/v2/..."),
    [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/..."),
    [bscTestnet.id]: http("https://data-seed-prebsc-1-s1.bnbchain.org:8545"),
  }, */
  //https://data-seed-prebsc-1-s1.bnbchain.org:8545
  storage: createStorage({
    storage: cookieStorage,
  }),
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: true, // Optional - true by default
  //...wagmiOptions, // Optional - Override createConfig parameters
});
