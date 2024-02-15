import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import { WagmiProvider, useAccount } from "wagmi";
//import { wagmiConfig, projectId } from "../blockchain/config/index";
//import { config } from "./config";
import ConnectButton from "@/components/shared/ConnectButton";
import LotteryEntrance from "../components/shared/LotteryEntrance";
//import ReadContract from "@/components/shared/ReadContract";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <main className="align-center p-8">
      <div className="w-1/2 items-center justify-between text-xl p-8 border w-3/5">
        <h1 className="p-2 pb-12 text-2xl">RAFFLE-LOTTERY Smart Contract</h1>
        <div className="p-2">
          Account:
          <ConnectButton />
        </div>

        <div className="pl-2 pt-4">
          Participate:
          <LotteryEntrance />
        </div>
      </div>
    </main>
  );
}
